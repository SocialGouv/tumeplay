export default (env: Record<string, any>) => {
  const ref =
    env.GITHUB_REF && env.GITHUB_REF.startsWith("refs/tags/")
      ? env.GITHUB_REF.split("/").pop().replace(/^v/, "")
      : `sha-${env.GITHUB_SHA}`;
  return ref;
};
