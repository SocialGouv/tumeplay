import {
  Box,
  Container,
  Heading,
  Image,
  ListItem,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import BackButton from "../../components/BackButton";

const Confidentiatily = () => {
  const tableLine = (
    <Tr>
      <Td>Pour la création de comptes</Td>
      <Td>
        <Text fontWeight={"bold"}>Jusqu’à la suppression du profil.</Text>
        <Text>Ou</Text>
        <Text fontWeight={"bold"}>
          Dans un délai d’1 an à compter de la dernière action du profil
        </Text>
      </Td>
    </Tr>
  );

  return (
    <Box bg="lightPink" pt={4} pl={3} h="100%" pb={10} minW="fit-content">
      <Container maxW="4xl">
        <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" mx="auto" my={6} />
        <Box mb={4}>
          <BackButton />
        </Box>
        <Heading fontFamily="heading" pb={6}>
          Politique de confidentialité
        </Heading>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Qui sommes-nous ?
        </Text>
        <Text py={2}>
          Notre application est réalisée au sein du ministère des solidarités et
          de la santé.
        </Text>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Quelles informations nous avons sur vous ?
        </Text>
        <Stack py={2}>
          <Text>
            Nous veillons à conserver le minimum d’information. Néanmoins pour
            améliorer l’utilisation de l’application et vous aider à améliorer
            vos connaissances en santé sexuelle, nous conservons :
          </Text>
          <UnorderedList px={10} py={2}>
            <ListItem>
              Pour la création de votre compte (prénom, tranche d’âge, ville ou
              lieu d’habitation) ;
            </ListItem>
            <ListItem>
              Pour la réception des différentes box (nom, prénom, adresse,
              adresse e-mail) ;
            </ListItem>
            <ListItem>
              Pour la découverte et l’amélioration des connaissances en santé
              sexuelle (modules intéressants).
            </ListItem>
          </UnorderedList>
          <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
            Avons-nous le droit d’avoir des informations sur vous ?
          </Text>
          <Text>
            Oui, dès lors que ces informations demeurent dans le rôle du
            ministère des solidarités et de la santé, notamment celui de
            contribuer à participer à l’amélioration de la santé des
            populations.
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Vos droits sur vos données
        </Text>
        <Stack py={2}>
          <Text>
            Nous nous engageons à ne jamais céder ces informations à des tiers.
          </Text>
          <Text>
            Vous avez un droit d’accès, de rectification et de suppression de
            vos données. Pour les exercer, faites-nous parvenir une demande en
            précisant la date et l’heure précise de la requête – ces éléments
            sont indispensables pour nous permettre de retrouver votre recherche
            – par voie électronique à l’adresse suivante :
            contact.tumeplay@fabrique.social.gouv.fr ou par voie postale :
          </Text>
          <Text>
            Direction du Numérique des ministères sociaux
            <br /> 39-43 Quai André Citroën
            <br /> 75015 Paris
          </Text>
        </Stack>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Comment TumePlay peut vous aider ?
        </Text>
        <Text py={2}>
          TumePlay peut vous aider à améliorer vos connaissances en santé
          sexuelle de manière ludique et encourager les comportements
          responsables.
        </Text>
        <Text
          fontFamily="heading"
          fontWeight="bold"
          as="u"
          fontSize="xl"
          py={2}
        >
          Comment de temps on conserve vos informations ?
        </Text>
        <Table variant={"striped"} mb={5}>
          <Thead>
            <Tr>
              <Th>Type de données</Th>
              <Th>Durée de conversation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableLine}
            {tableLine}
            {tableLine}
          </Tbody>
        </Table>
        <Text
          fontFamily="heading"
          fontWeight="bold"
          as="u"
          fontSize="xl"
          py={2}
        >
          Nos Sous-traitants
        </Text>
        <Text py={2}>
          Certaines des données sont envoyées à des sous-traitants pour réaliser
          certaines missions. Le responsable de traitement s&apos;est assuré de
          la mise en œuvre par ses sous-traitants de garanties adéquates et du
          respect de conditions strictes de confidentialité, d’usage et de
          protection des données.
        </Text>
        <Table variant={"striped"} mb={5}>
          <Thead>
            <Tr>
              <Th>Partenaires</Th>
              <Th>Pays destinataire</Th>
              <Th>Traitement réalisé</Th>
              <Th>Garanties</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Microsoft Azure</Td>
              <Td>France</Td>
              <Td>Hébergement</Td>
              <Td>
                <Link href="https://privacy.microsoft.com/fr-fr/privacystatement">
                  <Text cursor="pointer">
                    https://privacy.microsoft.com/fr-fr/privacystatement
                  </Text>
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Comment on protège vos informations ?
        </Text>
        <Text py={2}>
          Les mesures techniques et organisationnelles de sécurité adoptées pour
          assurer la confidentialité, l’intégrité et protéger l’accès des
          données sont notamment :
        </Text>
        <UnorderedList mb={5}>
          <ListItem>Anonymisation </ListItem>
          <ListItem>Stockage des données en base de données</ListItem>
          <ListItem>Cloisonnement des données</ListItem>
          <ListItem>Mesures de traçabilité</ListItem>
          <ListItem>Surveillance</ListItem>
          <ListItem>
            Protection contre les virus, malwares et logiciels espions
          </ListItem>
          <ListItem>Protection des réseaux</ListItem>
          <ListItem>Sauvegarde</ListItem>
          <ListItem>
            Mesures restrictives limitant l’accès physiques aux données à
            caractère personnel
          </ListItem>
        </UnorderedList>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Cookies
        </Text>
        <Text py={2}>
          Un cookie est un fichier déposé sur votre terminal lors de la visite
          d’un site. Il a pour but de collecter des informations relatives à
          votre navigation et de vous adresser des services adaptés à votre
          terminal (ordinateur, mobile ou tablette).
        </Text>
        <Text py={2}>
          Si le cookie traite vos informations personnelle, nous ne le
          déposerons qu’avec votre consentement. Vous pourrez le retirer à tout
          moment.
        </Text>
        <Text py={2}>
          En revanche, la loi nous autorise à déposer tout cookie nécessaire au
          fonctionnement à l’application ou s’il préserve vous anonymat.
        </Text>
        <Text py={2}>
          Le site dépose des cookies de mesure d’audience (nombre de visites,
          pages consultées), respectant les conditions d’exemption du
          consentement de l’internaute définies par la recommandation
          « Cookies » de la Commission nationale informatique et libertés
          (CNIL). Cela signifie, notamment, que ces cookies ne servent qu’à la
          production de statistiques anonymes et ne permettent pas de suivre la
          navigation de l’internaute sur d’autres sites.
        </Text>
        <Text py={2}>Il convient d’indiquer que :</Text>
        <UnorderedList mb={5}>
          <ListItem>
            Les données collectées ne sont pas recoupées avec d’autres
            traitements
          </ListItem>
          <ListItem>
            Les cookies ne permettent pas de suivre la navigation de
            l’internaute sur d’autres sites.
          </ListItem>
        </UnorderedList>
        <Text fontFamily="heading" fontWeight="bold" as="u" fontSize="xl">
          Boutton modifier les réglages
        </Text>
        <Text py={2}>
          À tout moment, vous pouvez refuser l’utilisation des cookies et
          désactiver le dépôt sur votre ordinateur en utilisant la fonction
          dédiée de votre navigateur (fonction disponible notamment sur
          Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple
          Safari et Opera).
        </Text>
        <Text>
          Pour aller plus loin, vous pouvez consulter les fiches proposées par
          la Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
          :
        </Text>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi">
              <Text cursor="pointer">
                Cookies & traceurs : que dit la loi ?
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">
              <Text cursor="pointer">
                Cookies : les outils pour les maîtriser
              </Text>
            </Link>
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default Confidentiatily;
