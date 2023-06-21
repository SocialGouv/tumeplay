# Tumeplay

to write...

## Deployment

- Commits on branch `master` will trigger [semantic-release](https://github.com/semantic-release/semantic-release)
- New releases will trigger production environments

The `.kontinuous` folder define [kontinuous](https://socialgouv.github.io/kontinuous/) config and environments for the SocialGouv platform.

To generate kube manifests :

```sh
npx kontinuous build --env dev -o
```
