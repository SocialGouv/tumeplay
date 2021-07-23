import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";

import { Probe } from "kubernetes-models/v1";

const project = "tumeplay";
const name = "tumeplay-backend";

const probe = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const getGithubRef = (env: Record<string, any>) => {
  const ref =
    env.GITHUB_REF && env.GITHUB_REF.startsWith("refs/tags/")
      ? env.GITHUB_REF.split("/").pop()
      : `sha-${env.GITHUB_SHA}`;
  return ref;
};

const createManifests = async () => {
  const tag = getGithubRef(process.env);
  const manifests = await create(name, {
    env,
    config: {
      subdomain: name,
      containerPort: 1337,
      withPostgres: true,
    },
    deployment: {
      image: `ghcr.io/socialgouv/tumeplay/backend:${tag}`,
      container: {
        livenessProbe: probe,
        readinessProbe: probe,
        startupProbe: probe,
        resources: {
          requests: {
            cpu: "100m",
            memory: "128Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1280Mi",
          },
        },
      },
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

  return manifests;
};

export default createManifests;
