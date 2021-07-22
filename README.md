# Tumeplay

to write...

## Deployment

The `.k8s` folder define [kosko](https://kosko.dev) components and environments for the SocialGouv platform.

To generate manifests :

```sh
yarn k8s generate --env prod
```

Generated manifests are snapshotted to prevent regressions, run `yarn k8s test -u` to update the snaphosts.
