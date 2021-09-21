import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { ok } from "assert";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/v1/EnvVar";
import environments from "@socialgouv/kosko-charts/environments";

import getImageTag from "../utils/getImageTag";
import { getManifests as getBackendManifests } from "../components/backend";

export default async (name: string) => {
  const probesPath = "/";
  const ciEnv = environments(process.env);

  const imageTag = getImageTag(process.env);

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
        ? `${ciEnv.metadata.subdomain}`
        : ciEnv.metadata.subdomain,
    },
    deployment: {
      image: `ghcr.io/socialgouv/tumeplay/frontend-${name}:${imageTag}`,
      ...podProbes,
    },
  });

	const getMatomoId = (name: string) => {
		return ciEnv.isProduction ?
		name === 'metropole' ? '21' : '45'
		:
		name === 'metropole' ? '48' : '49'
	}

  /* pass dynamic deployment URL as env var to the container */
  //@ts-expect-error
  const deployment = getManifestByKind(manifests, Deployment) as Deployment;

  ok(deployment);

  const backendManifests = await getBackendManifests();

  const otherZone = name === "metropole" ? "guyane" : "metropole";

  addEnvs({
    deployment,
    data: {
      REACT_APP_API_URL: `https://${getIngressHost(backendManifests)}`,
      REACT_APP_ZONE: name,
      REACT_APP_OTHER_ZONE_URL: `https://${getIngressHost(manifests).replace(
        name,
        otherZone
      )}`,
			REACT_APP_MATOMO_ID: getMatomoId(name)
    },
  });

  return manifests;
};
