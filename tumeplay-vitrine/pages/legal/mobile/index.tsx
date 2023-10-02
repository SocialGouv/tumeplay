import { Box, Container, Heading, Stack, Text, Image } from "@chakra-ui/react";
import BackButton from "../../../components/BackButton";

const MobileLegal = () => {
  return (
    <Box bg="lightPink" pt={4} pl={3} h="100vh">
      <Container maxW="4xl">
        <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" mx="auto" my={6} />
        <Box mb={4}>
          <BackButton />
        </Box>
        <Heading fontFamily="heading" pb={6}>
          Mentions légales
        </Heading>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Éditeur de la plateforme
        </Text>
        <Stack py={2}>
          <Text>
            par : <br />
          </Text>
          <Text>
            Fabrique des Ministères sociaux <br />
            Tour Mirabeau 39-43 Quai André <br />
            Citroën 75015 PARIS <br />
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Directeur de publication
        </Text>
        <Stack py={2}>
          <Text>Monsieur Grégory Emery - Directeur général de la Santé</Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Hébergement de la plateforme
        </Text>
        <Stack py={2}>
          <Text pb={2}>
            Cette plateforme est hébergé par <br />
          </Text>
          <Text>
            Microsoft France <br />
            37 Quai du Président Roosevelt 92130 <br />
            ISSY-LES-MOULINEAUX <br />
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Accessibilité
        </Text>
        <Stack py={2}>
          <Text>
            La conformité aux normes d&apos;accessibilité numérique est un
            objectif ultérieur mais nous tâchons de rendre la plateforme
            accessible à toutes et à tous.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Signaler un dysfonctionnement
        </Text>
        <Stack py={2}>
          <Text>
            Si vous rencontrez un défaut d&apos;accessibilité vous empêchant
            d’accéder à un contenu ou une fonctionnalité de la plateforme, merci
            de nous en faire part. Si vous n&apos;obtenez pas de réponse rapide
            de notre part, vous êtes en droit de faire parvenir vos doléances ou
            une demande de saisine au Défenseur des droits.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default MobileLegal;
