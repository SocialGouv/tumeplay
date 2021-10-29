import env from "@kosko/env";
import environments from "@socialgouv/kosko-charts/environments";
import { addEnvs } from "@socialgouv/kosko-charts/utils/addEnvs";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";

import { getManifests as getBackendManifests } from "../components/backend";

export default async () => {
  const subdomain = "bo-tumeplay";
  const ciEnv = environments(process.env);
  const subDomainPrefix = (!ciEnv.isProduction && `bo-`) || undefined;
  const version = ciEnv.isPreProduction ? `preprod-${ciEnv.sha}` : ciEnv.tag || `sha-${ciEnv.sha}`;
  const image = `ghcr.io/socialgouv/tumeplay/dashboard:${version}`;

  const manifests = await create("dashboard", {
    env,
    config: {
      image,
      subdomain,
      subDomainPrefix
    }
  });

  const backendManifests = await getBackendManifests();

  /* pass dynamic deployment URL as env var to the container */
  //@ts-expect-error
  const deployment = getManifestByKind(manifests, Deployment) as Deployment;

  addEnvs({
    deployment,
    data: {
      REACT_APP_API_URL: `https://${getIngressHost(backendManifests)}`
    },
  });

  return manifests;
};
