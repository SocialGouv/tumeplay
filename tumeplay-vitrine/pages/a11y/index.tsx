import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Image,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";

const A11y = () => {
  return (
    <Box bg="lightPink" pt={4} pl={3} h="100%" pb={10} minW="fit-content">
      <Container maxW="4xl">
        <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" mx="auto" my={6} />
        <Box mb={4}>
          <BackButton />
        </Box>
        <Heading as="h1" mt={10}>
          Déclaration d’accessibilité
        </Heading>
        <Text>
          Établie le <Text as="span">4 novembre 2022</Text>.
        </Text>
        <Text>
          <Text as="span">Le Ministère des Solidarités et de la Santé</Text>{" "}
          s’engage à rendre son service accessible, conformément à l’article 47
          de la loi n° 2005-102 du 11 février 2005.
        </Text>
        <Text>
          Cette déclaration d’accessibilité s’applique à{" "}
          <Text as="b">Tumeplay</Text>
          <Text as="span">
            {" "}
            (<Text as="span">https://tumeplay.fabrique.social.gouv.fr/</Text>)
          </Text>
          .
        </Text>
        <Heading as="h2" size="lg" mt={10}>
          État de conformité
        </Heading>
        <Text>
          <Text as="b">Tumeplay</Text> est
          <Text as="b">
            <Text as="span" data-printfilter="lowercase">
              non conforme
            </Text>
          </Text>{" "}
          avec le{" "}
          <abbr title="Référentiel général d’amélioration de l’accessibilité">
            RGAA
          </abbr>
          . <Text as="span">Le site n’a encore pas été audité.</Text>
        </Text>
        <Heading as="h2" size="lg" mt={10}>
          Contenus non accessibles
        </Heading>
        <Text>
          Les contenus listés ci-dessous ne sont pas accessibles pour les
          raisons suivantes :
        </Text>
        <Heading as="h3" size="md" mt={6}>
          Non Conformité
        </Heading>
        <UnorderedList>
          <ListItem>
            Critère 7.3 : Chaque script est-il contrôlable par le clavier et par
            tout dispositif de pointage (hors cas particuliers) ?
          </ListItem>
          <ListItem>
            Critère 7.4 : Pour chaque script qui initie un changement de
            contexte, l’utilisateur est-il averti ou en a-t-il le contrôle ?
          </ListItem>
          <ListItem>
            Critère 12.1 : Chaque ensemble de pages dispose-t-il de deux
            systèmes de navigation différents, au moins (hors cas particuliers)
            ?
          </ListItem>
          <ListItem>
            Critère 12.8 : Dans chaque page web, l’ordre de tabulation est-il
            cohérent ?
          </ListItem>
        </UnorderedList>
        <Heading as="h2" size="lg" mt={10}>
          Amélioration et contact
        </Heading>
        <Text>
          Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
          pouvez contacter le responsable de <Text as="span">Tumeplay</Text>{" "}
          pour être orienté vers une alternative accessible ou obtenir le
          contenu sous une autre forme.
        </Text>
        <UnorderedList>
          <ListItem>
            E-mail&nbsp;:{" "}
            <a href="mailto:contact@tumeplay.fabrique.social.gouv.fr">
              contact@tumeplay.fabrique.social.gouv.fr
            </a>
          </ListItem>

          <ListItem>
            Adresse&nbsp;:{" "}
            <Text as="span">
              La Fabrique numérique des ministères sociaux, Javel, Paris
            </Text>
          </ListItem>
        </UnorderedList>
        <Text>
          Nous essayons de répondre dans les{" "}
          <Text as="span">2 jours ouvrés</Text>.
        </Text>
        <Heading as="h2" size="lg" mt={10}>
          Voie de recours
        </Heading>
        <Text>
          Cette procédure est à utiliser dans le cas suivant&nbsp;: vous avez
          signalé au responsable du site internet un défaut d’accessibilité qui
          vous empêche d’accéder à un contenu ou à un des services du portail et
          vous n’avez pas obtenu de réponse satisfaisante.
        </Text>
        <Text>Vous pouvez&nbsp;:</Text>
        <UnorderedList>
          <ListItem>
            Écrire un message au{" "}
            <a href="https://formulaire.defenseurdesdroits.fr/">
              Défenseur des droits
            </a>
          </ListItem>
          <ListItem>
            Contacter{" "}
            <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
              le délégué du Défenseur des droits dans votre région
            </a>
          </ListItem>
          <ListItem>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de
            timbre)&nbsp;:
            <br />
            Défenseur des droits
            <br />
            Libre réponse 71120 75342 Paris CEDEX 07
          </ListItem>
        </UnorderedList>
        <hr />
        <Text>
          Cette déclaration d’accessibilité a été créé le{" "}
          <Text as="span">4 novembre 2022</Text> grâce au{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://betagouv.github.io/a11y-generateur-declaration/#create"
          >
            Générateur de Déclaration d’Accessibilité de BetaGouv
          </Link>
          .
        </Text>
      </Container>
    </Box>
  );
};

export default A11y;
