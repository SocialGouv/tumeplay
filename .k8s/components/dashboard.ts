import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import environments from "@socialgouv/kosko-charts/environments";

export default async () => {
  const subdomain = "tumeplay-dashboard";
  const ciEnv = environments(process.env);
  const image = `harbor.fabrique.social.gouv.fr/tumeplay/dashboard:${ciEnv.tag || ciEnv.sha}`;

  const manifests = await create("dashboard", {
    env,
    config: { subdomain, image }
  });

  return manifests;
};
