# Tumeplay

to write....

## Deployment

 - Commits on branch `master` will trigger [semantic-release](https://github.com/semantic-release/semantic-release)
 - New releases will trigger manual deployments on preproduction and production environments

The `.k8s` folder define [kosko](https://kosko.dev) components and environments for the SocialGouv platform.

- Public settings should reside in `.k9s/environments/[env]/backend.configmap.yaml`
- Private settings should reside in `.k9s/environments/[env]/backend.sealed-secret.yaml`

To generate manifests :

```sh
yarn k8s generate --env prod
```

Generated manifests are snapshotted to prevent regressions, run `yarn k8s test -u` to update the snaphosts.
