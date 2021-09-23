import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import environments from "@socialgouv/kosko-charts/environments";

export default async () => {
  const subdomain = "bo-tumeplay";
  const ciEnv = environments(process.env);
  const subDomainPrefix = (!ciEnv.isProduction && `bo-`) || undefined;
  const image = `ghcr.io/socialgouv/tumeplay/dashboard:${ciEnv.tag || ciEnv.sha}`;

  const manifests = await create("dashboard", {
    env,
    config: {
      image,
      subdomain,
      subDomainPrefix
    }
  });

  return manifests;
};
