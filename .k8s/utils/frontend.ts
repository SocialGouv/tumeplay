import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { ok } from "assert";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/v1/EnvVar";
import environments from "@socialgouv/kosko-charts/environments";

import { getManifests as getBackendManifests } from "../components/backend";

export default async (name: string) => {
  const probesPath = "/";
  const subdomain = "tumeplay";
  const ciEnv = environments(process.env);

  const tag = process.env.GITHUB_SHA;

  const podProbes = ["livenessProbe", "readinessProbe", "startupProbe"].reduce(
    (probes, probe) => ({
      ...probes,
      [probe]: {
        httpGet: {
          path: probesPath,
          port: "http",
        },
        initialDelaySeconds: 30,
        periodSeconds: 15,
      },
    }),
    {}
  );

  const manifests = await create(name, {
    env,
    config: {
      subDomainPrefix: `${name}-`,
      subdomain: ciEnv.isProduction
        ? `fake-${ciEnv.metadata.subdomain}`
        : ciEnv.metadata.subdomain,
    },
    deployment: {
      image: `ghcr.io/socialgouv/tumeplay/frontend-${name}:sha-${tag}`,
      ...podProbes,
    },
  });

  /* pass dynamic deployment URL as env var to the container */
  //@ts-expect-error
  const deployment = getManifestByKind(manifests, Deployment) as Deployment;

  ok(deployment);

  const backendManifests = await getBackendManifests();

  const backendUrl = new EnvVar({
    name: "REACT_APP_API_URL",
    value: `https://${getIngressHost(backendManifests)}/`,
  });

  addEnv({ deployment, data: backendUrl });

  return manifests;
};
