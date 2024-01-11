# Tumeplay

Accompagner les jeunes dans leur parcours d’apprentissage en santé sexuelle de manière ludique et fiable.

## Tumeplay Vitrine

Landing page conçue pour présenter divers thèmes liés à la sexualité de manière éducative et informative. Elle comprend des informations sous forme de card pour expliquer des sujets spécifiques liés à la sexualité.

Créer un fichier .env avec les informations du .env.example du repo

```bash
npm run dev
# or
yarn dev
```

## Tumeplay Dashboard

Vise à fournir un backoffice (panneau d'administration) pour l'application Tumeplay, permettant aux gestionnaires d'accéder à l'historique des commandes (box) effectuées par les utilisateurs.

Créer un fichier .env avec les informations du .env.example du repo

```bash
npm start
# or
yarn start
```

## Tumeplay App

Développer une application visant à augmenter les connaissances et compétences des jeunes en matière de santé sexuelle. Contient des informations sur la sexualité, des quizzs et possibilité de commander des kits.

Créer un fichier .env et un fichier .env.example. Récupérer les informations des fichiers env du dossier environnements.

```bash
npm start
# or
yarn start
```

## Tumeplay Mobile

Développer une application mobile visant à augmenter les connaissances et compétences des jeunes en matière de santé sexuelle. Contient des informations sur la sexualité, des quizzs et possibilité de commander des kits.

Créer un fichier .env avec les informations du .env.example du repo

```bash
npm start
# or
yarn start

#ios
npm run ios
yarn ios

#android
npm run android
yarn android
```

## Deployment

- Commits on branch `master` will trigger [semantic-release](https://github.com/semantic-release/semantic-release)
- New releases will trigger production environments

The `.kontinuous` folder define [kontinuous](https://socialgouv.github.io/kontinuous/) config and environments for the SocialGouv platform.

To generate kube manifests :

```sh
npx kontinuous build --env dev -o
```
