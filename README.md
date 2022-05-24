# Tumeplay

to write...

## Deployment

- Commits on branch `master` will trigger [semantic-release](https://github.com/semantic-release/semantic-release)
- New releases will trigger production environments

The `.kube-workflow` folder define [kube-workflow](https://github.com/SocialGouv/kube-workflow/) config and environments for the SocialGouv platform.

To generate kube manifests :

```sh
npx kube-workflow build --env dev -o
```
