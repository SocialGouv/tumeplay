import env from "@kosko/env";
import { loadFile } from "@kosko/yaml";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import {
  VolumeMount,
  Probe,
  ResourceRequirements,
  Volume,
} from "kubernetes-models/v1";

const getGithubRef = (env: Record<string, any>) => {
  const ref =
    env.GITHUB_REF && env.GITHUB_REF.startsWith("refs/tags/")
      ? env.GITHUB_REF.split("/").pop().replace(/^v/, "")
      : `sha-${env.GITHUB_SHA}`;
  return ref;
};

const component = "backend";

const prob = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const resources = new ResourceRequirements({
  requests: {
    cpu: "300m",
    memory: "256Mi",
  },
  limits: {
    cpu: "1",
    memory: "1Gi",
  },
});

export default async () => {
  const volumeName = "uploads";
  const ephemeralVolume = env.env !== "prod" && env.env !== "preprod"; // dont use fixed storage except in prod. theres no dev storage srv atm

  const tag = getGithubRef(process.env);

  const [persistentVolumeClaim, persistentVolume] = azureProjectVolume(
    volumeName,
    {
      storage: "5Gi",
    }
  );
  const uploadsVolume = new Volume({
    persistentVolumeClaim: { claimName: persistentVolumeClaim.metadata!.name! },
    name: volumeName,
  });

  const emptyDir = new Volume({ name: volumeName, emptyDir: {} });

  const uploadsVolumeMount = new VolumeMount({
    mountPath: "/app/public/uploads",
    name: volumeName,
  });

  // generate basic strapi manifests
  const manifests = await create(component, {
    env,
    config: {
      withPostgres: true,
      subdomain: "tumeplay-backend",
      containerPort: 1337,
      image: `ghcr.io/socialgouv/tumeplay/backend:${tag}`,
    },
    deployment: {
      container: {
        livenessProbe: prob,
        readinessProbe: prob,
        startupProbe: prob,
        resources,
        volumeMounts: [uploadsVolumeMount],
      },
      volumes: [ephemeralVolume ? emptyDir : uploadsVolume],
    },
  });

  const deployment = getDeployment(manifests);

  addEnvs({
    deployment,
    data: {
      DATABASE_CLIENT: "postgres",
      DATABASE_NAME: "$(PGDATABASE)",
      DATABASE_HOST: "$(PGHOST)",
      DATABASE_PORT: "$(PGPORT)",
      DATABASE_USERNAME: "$(PGUSER)",
      DATABASE_PASSWORD: "$(PGPASSWORD)",
      DATABASE_SSL: "true",
    },
  });

  const azureVolume = loadFile(
    `environments/${env.env}/azure-volume.sealed-secret.yaml`
  )().catch((e) => {
    console.error(e);
    return [];
  });
  return manifests
    .concat(azureVolume as any)
    .concat(ephemeralVolume ? [] : [persistentVolumeClaim, persistentVolume]);
};
