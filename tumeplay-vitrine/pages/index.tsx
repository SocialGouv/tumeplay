import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Text,
  Flex,
  Divider,
  Heading,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react";
import Header from "../components/header";
import Link from "next/link";

const Home = () => {
  const [country, setCountry] = useState<string>("");

  const getCountryLocation = () => {
    fetch("https://ipapi.co/json/").then((res) => {
      res.json().then((data) => {
        setCountry(data.country_name);
      });
    });
  };

  const siteData = [
    {
      url: "https://www.onsexprime.fr/",
      name: "Onsexprime",
      img: "logo-onsex.svg",
    },
    {
      url: "https://questionsexualite.fr/",
      name: "Questions Sexualité",
      img: "questionsex_logo.svg",
    },
    {
      url: "https://ivg.gouv.fr/",
      name: "Le site officiel sur l'IVG",
      img: "gouvernement_logo.png",
    },
    {
      url: "https://www.filsantejeunes.com/",
      name: "Filsantéjeunes",
      img: "numero_vert.png",
    },
  ];

  useEffect(() => {
    getCountryLocation();
  }, []);

  if (country === "French Guiana") {
    window.location.href =
      "https://guyane-tumeplay.fabrique.social.gouv.fr/?zone_choice=true";
    return (
      <Box>
        <Text>Redirection en cours...</Text>
      </Box>
    );
  }

  return (
    <Box bg="lightPink" pb={16} minH="100vh">
      <Box
        py={2}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        role="banner"
        aria-label="presentation"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={["space-between", "space-between", "flex-end"]}
          alignItems="center"
          textAlign="right"
          fontSize={["sm", "sm", "auto"]}
          w="full"
          px={2}
        >
          <ChakraLink
            href="https://guyane-tumeplay.fabrique.social.gouv.fr/"
            rel="noreferrer"
            target="_blank"
            mr={[0, 0, 3]}
            mb={2}
          >
            <Text
              cursor="pointer"
              _hover={{
                textDecoration: "underline",
              }}
            >
              Guyane
            </Text>
          </ChakraLink>
          <Divider
            h={[3, 3, 4]}
            mr={[0, 0, 3]}
            mb={2}
            borderColor="black"
            orientation="vertical"
          />
          <Link href="/stats" passHref>
            <ChakraLink
              flexShrink={0.1}
              cursor="pointer"
              mr={[0, 0, 3]}
              mb={2}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Statistiques
            </ChakraLink>
          </Link>
          <Divider
            h={[3, 3, 4]}
            mr={[0, 0, 3]}
            mb={2}
            borderColor="black"
            orientation="vertical"
          />
          <Link href="/legal/web" passHref>
            <ChakraLink
              flexShrink={0.1}
              cursor="pointer"
              mr={[0, 0, 3]}
              mb={2}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Mentions légales
            </ChakraLink>
          </Link>
          <Divider
            h={[3, 3, 4]}
            mr={[0, 0, 3]}
            mb={2}
            borderColor="black"
            orientation="vertical"
          />
          <Link href="/confidentiality" passHref>
            <ChakraLink
              flexShrink={0.1}
              cursor="pointer"
              mr={[0, 0, 3]}
              mb={2}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Données personnelles
            </ChakraLink>
          </Link>
          <Divider
            h={[3, 3, 4]}
            mr={[0, 0, 3]}
            mb={2}
            borderColor="black"
            orientation="vertical"
          />
          <Link href="/a11y" passHref>
            <ChakraLink
              flexShrink={0.1}
              cursor="pointer"
              mr={[0, 0, 3]}
              mb={2}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Accessibilité : non conforme
            </ChakraLink>
          </Link>
        </Box>
      </Box>
      <Container maxW="6xl" pt={5} role="main" aria-label="Content-Display">
        <Head>
          <title>Tumeplay</title>
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval';
						script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
						connect-src * data: blob: 'unsafe-inline';
						img-src * data: blob: 'unsafe-inline';
						frame-src * data: blob: ;
						style-src * data: blob: 'unsafe-inline';
						font-src * data: blob: 'unsafe-inline';"
          />
          <meta
            name="description"
            content="Avec TUMEPLAY découvre et explore ta sexualité en t’amusant. L’appli pour tester tes connaissances en matière de sexualité, pensée et construite avec des jeunes de ton âge. Elle a été conçue pour que tout le monde ait la même chance et le même niveau d’information sur la sexualité."
          />
          <meta
            property="og:title"
            content="Tumeplay, l'application mobile d'apprentissage en santé sexuelle."
            key="title"
          />
          <meta
            property="og:description"
            content="Avec TUMEPLAY découvre et explore ta sexualité en t’amusant. L’appli pour tester tes connaissances en matière de sexualité, pensée et construite avec des jeunes de ton âge. Elle a été conçue pour que tout le monde ait la même chance et le même niveau d’information sur la sexualité."
            key="description"
          />
          <meta
            property="og:image"
            content="https://tumeplay.fabrique.social.gouv.fr/logo-tumeplay-share.png"
            key="image"
          />
          <meta property="og:url" content="https://tumeplay.fr" key="url" />
          <link
            rel="icon"
            href="https://tumeplay.fabrique.social.gouv.fr/favicon.ico"
          />
          <meta property="og:type" content="siteweb" />
          <meta name="robots" content="all" />
        </Head>
        <Header />
        <Flex flexDir={"column"} align={"center"} fontSize={18} mt={4}>
          <Heading
            as="h1"
            mb={[4, 4, 6]}
            fontSize={["2xl", "2xl", "xl"]}
            textAlign={"center"}
          >
            Tumeplay c’est terminé ! Mais tu peux retrouver d’autres contenus
            sur les sites suivants :
          </Heading>

          <Flex
            gap={5}
            width={"100%"}
            flexWrap={["wrap", "wrap", "nowrap"]}
            justifyContent={"space-around"}
            align={"center"}
            padding={10}
          >
            {siteData.map((site, index) => (
              <ChakraLink
                target="_blank"
                w={"100%"}
                href={site.url}
                key={index}
              >
                <Box
                  background={"#F4F0EB"}
                  w={"100%"}
                  p={4}
                  borderRadius="lg"
                  height={"200px"}
                  display={"flex"}
                  alignItems={"center"}
                  cursor={"pointer"}
                  _hover={{ transform: "scale(1.05)" }}
                  transition="transform 0.3s ease-in-out"
                >
                  <Image src={site.img} alt={site.name} width={"100%"} />
                </Box>
              </ChakraLink>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
