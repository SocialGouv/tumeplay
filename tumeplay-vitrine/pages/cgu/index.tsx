import {
  Box,
  Container,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";

const CGU = () => {
  return (
    <Box bg="lightPink" py={6} pl={3} h="full">
      <Container maxW="4xl">
        <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" mx="auto" my={6} />
        <Box mb={4}>
          <BackButton />
        </Box>
        <Heading fontFamily="heading">
          Conditions d&apos;utilisation de l&apos;application
        </Heading>
        <Stack py={4}>
          <Text>
            Les présentes conditions générales d’utilisation (dites « CGU »)
            fixent le cadre juridique de l’application TumePlay définissent les
            conditions d’accès et d’utilisation des services par l’Utilisateur.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 1 - Champ d’application
        </Text>
        <Stack py={2}>
          <Text>
            L’application peut être téléchargée demeure d’accès libre après une
            création de compte. <br />
            L’utilisation de l’application vaut acceptation des présentes CGU.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 2 - Objet
        </Text>
        <Stack py={2}>
          <Text>
            « TumePlay » vise à améliorer les connaissances en santé sexuelle et
            encourager les comportements responsables.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 3 – Définitions
        </Text>
        <Stack py={2}>
          <Text>
            L’Utilisateur est tout jeune qui télécharge l’application et
            l’utilise. <br />
            Les services sont l&apos;ensemble des services proposés par
            TumePlay.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 4- Fonctionnalités
        </Text>
        <Stack py={2}>
          <Box py={2}>
            <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="lg">
              4.1 Création de compte
            </Text>
          </Box>
          <Text>
            L’Utilisateur peut créer son compte après avoir téléchargé
            l’application. L’interface est toujours accessible depuis l’onglet «
            Accueil ». Il sera nécessaire d’avoir un identifiant et un mot de
            passe que l’Utilisateur devra conserver.
          </Text>
          <Box py={2}>
            <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="lg">
              4.2 Réaliser les quizz et améliorer ses connaissances
            </Text>
          </Box>
          <Text>
            L’Utilisateur peut toujours lire et s’informer sur les derniers
            contenus disponibles. <br />
            En outre, il pourra :
          </Text>
          <UnorderedList>
            <ListItem>
              répondre aux différents quizz sur des sujets et thèmes spécifiques
              en santé sexuelle et répartis selon des niveaux
            </ListItem>
            <ListItem>
              obtenir des points lors des quizz et les utiliser pour obtenir les
              différentes box
            </ListItem>
            <ListItem>revenir sur les informations</ListItem>
          </UnorderedList>
          <Box py={2}>
            <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="lg">
              4.3 Recevoir les box
            </Text>
          </Box>
          <Text>
            Si un jeune obtient les points nécessaires lors de ses quizz, il
            peut demander à recevoir les box d’information en santé sexuelle. Il
            est possible de recevoir sa box à son domicile ou en point relais.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 5 - Responsabilités
        </Text>
        <Stack py={2}>
          <Box py={2}>
            <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="lg">
              5.1 L’éditeur du Site
            </Text>
          </Box>
          <Text>
            Les sources des informations diffusées sur l’application sont
            réputées fiables mais TumePlay ne garantit pas qu’il soit exempt de
            défauts, d’erreurs ou d’omissions. <br />
            Tout événement dû à un cas de force majeure ayant pour conséquence
            un dysfonctionnement du site et sous réserve de toute interruption
            ou modification en cas de maintenance, n&apos;engage pas la
            responsabilité de l’éditeur. <br />
            L’éditeur s’engage à mettre en œuvre toutes mesures appropriées,
            afin de protéger les données traitées. <br />
            L’éditeur s’engage à la sécurisation du site, notamment en prenant
            les mesures nécessaires permettant de garantir la sécurité et la
            confidentialité des informations fournies. <br />
            L’éditeur fournit les moyens nécessaires et raisonnables pour
            assurer un accès continu, sans contrepartie financière, à la
            Plateforme. Il se réserve la liberté de faire évoluer, de modifier
            ou de suspendre, sans préavis, la plateforme pour des raisons de
            maintenance ou pour tout autre motif jugé nécessaire.
          </Text>
        </Stack>
        <Stack py={2}>
          <Box py={2}>
            <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="lg">
              5.1 L’éditeur du Site
            </Text>
          </Box>
          <Text>
            Toute information transmise par l&apos;Utilisateur est de sa seule
            responsabilité et il s’engage à ne pas avoir de propos ligne
            contraires aux dispositions légales et réglementaires en vigueur. En
            particulier, l’Utilisateur s’engage à ne pas publier de message
            racistes, sexistes, injurieux, insultants ou contraires à l’ordre
            public.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Article 6 - Mise à jour des conditions d’utilisation
        </Text>
        <Stack py={2}>
          <Text>
            Les termes des présentes conditions d’utilisation peuvent être
            amendés à tout moment, sans préavis, en fonction des modifications
            apportées à la plateforme, de l’évolution de la législation ou pour
            tout autre motif jugé nécessaire.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default CGU;
