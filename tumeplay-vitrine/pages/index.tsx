import { useState, useEffect } from "react";
import axios from "axios";
import { Post, Theme, ZPost } from "./api/posts/types";
import Head from "next/head";
import {
  Box,
  Container,
  Spinner,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Divider,
  Link as ChakraLink,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import Header from "../components/header";
import Themes from "../components/themes";
import PostCard from "../components/PostCard";
import { useDebounce } from "usehooks-ts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";

const Home = ({
  initialPosts,
  initialThemes,
}: {
  initialPosts: Post[];
  initialThemes: Theme[];
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedThemesIds, setSelectedThemesIds] = useState<number[]>([]);
  const [themes] = useState<Theme[]>(initialThemes);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const debouncedValue = useDebounce<string>(search as string, 500);
  const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");

  const handleScroll = () => {
    const windowH = window.innerHeight;
    const documentH = document.documentElement.scrollTop;
    const documentOffset = document.documentElement.offsetHeight;
    if (documentH + windowH <= documentOffset - 2500) {
      return;
    }
    setIsFetching(true);
  };

  const loadmoreContent = () => {
    axios
      .get(`${NEXT_PUBLIC_STRAPI_URL}/contents`, {
        params: {
          _start: posts.length + 1,
          _limit: 15,
          title_mobile_null: false,
          thematique_mobile_null: false,
        },
      })
      .then((res) => {
        const adjustedRes = (res.data || []).map((c: Post) => ({
          ...c,
          image: {
            ...c.image,
            url: NEXT_PUBLIC_STRAPI_URL + c.image?.formats?.thumbnail?.url,
          },
          thematique_mobile: {
            ...c.thematique_mobile,
            image: {
              ...c.thematique_mobile?.image,
              url: NEXT_PUBLIC_STRAPI_URL + c.thematique_mobile?.image?.url,
            },
          },
          etiquette: {
            ...c.etiquette,
            image: {
              ...c.etiquette?.image,
              url:
                NEXT_PUBLIC_STRAPI_URL +
                c.etiquette?.image.formats?.thumbnail?.url,
            },
          },
        }));
        const tmpPosts = [...posts, ...adjustedRes];
        setPosts(tmpPosts);
        setIsFetching(false);
      });
  };

  const getCountryLocation = () => {
    fetch("https://ipapi.co/json/").then((res) => {
      res.json().then((data) => {
        setCountry(data.country_name);
      });
    });
  };

  useEffect(() => {
    getCountryLocation();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    loadmoreContent();
  }, [isFetching]);

  const fetchPosts = (themeIds: number[]) => {
    setIsLoading(true);
    let params: {
      [key: string]: string | string[] | boolean | number | number[];
    } = {};

    if (themeIds.length > 0) {
      params.theme = themeIds;
    }

    if (search) {
      params.search = search;
    }

    console.log(params);

    axios
      .get("/api/posts", { params })
      .then((response) => {
        setPosts((response.data || []).map((p: any) => ZPost.parse(p)));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleThemeClick = (id: number) => {
    if (selectedThemesIds.includes(id)) {
      let newThemeIds = selectedThemesIds.filter((tId) => tId !== id);
      setSelectedThemesIds(newThemeIds);
      fetchPosts(newThemeIds);
    } else {
      let newThemeIds = [...selectedThemesIds, id];
      setSelectedThemesIds(newThemeIds);
      fetchPosts(newThemeIds);
    }
  };

  useEffect(() => {
    if (search !== null) {
      fetchPosts(selectedThemesIds);
    }
  }, [debouncedValue]);

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
        <FormControl>
          <FormLabel htmlFor="input-search" fontWeight="bold">
            Rechercher un contenu :
          </FormLabel>
          <InputGroup size="lg" mb={10}>
            <InputLeftAddon>
              <SearchIcon />
            </InputLeftAddon>
            <Input
              id="input-search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Tape un mot clé : contraception, clitoris, consentement..."
              value={search || ""}
            />
            {search && (
              <InputRightElement cursor="pointer" onClick={() => setSearch("")}>
                <CloseIcon />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
        <Themes
          onClick={handleThemeClick}
          selectedThemesIds={selectedThemesIds}
          themes={themes}
        />
        {isLoading ? (
          <Box h="100vh">
            <Spinner
              size="xl"
              color="primary"
              mx="auto"
              display="block"
              mt={16}
            />
          </Box>
        ) : posts.length > 0 ? (
          <Box mt={4}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1rem">
                {posts.map((p) => (
                  <Box key={p.id}>
                    <PostCard post={p} />
                  </Box>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </Box>
        ) : (
          <Text fontSize="xl" textAlign="center" mt={10}>
            <Box as="span" fontSize="4xl">
              😢
            </Box>
            <br />
            Aucun élement à afficher
          </Text>
        )}
      </Container>
    </Box>
  );
};

export async function getServerSideProps() {
  const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;
  let response = await axios.get(`${NEXT_PUBLIC_STRAPI_URL}/contents`, {
    params: {
      _start: 0,
      _limit: 15,
      title_mobile_null: false,
      thematique_mobile_null: false,
    },
  });
  const posts = (response.data || []).map((c: Post) => ({
    ...c,
    image: {
      ...c.image,
      url: NEXT_PUBLIC_STRAPI_URL + c.image?.formats?.thumbnail?.url,
    },
    thematique_mobile: {
      ...c.thematique_mobile,
      image: {
        ...c.thematique_mobile.image,
        url: NEXT_PUBLIC_STRAPI_URL + c.thematique_mobile.image.url,
      },
    },
    etiquette: {
      ...c.etiquette,
      image: {
        ...c.etiquette?.image,
        url:
          NEXT_PUBLIC_STRAPI_URL + c.etiquette?.image.formats?.thumbnail?.url,
      },
    },
  }));

  response = await axios.get(`${NEXT_PUBLIC_STRAPI_URL}/thematique-mobiles`, {
    params: {
      _start: 0,
      _limit: 100,
    },
  });
  const themes = (response.data || []).map((t: Theme) => ({
    ...t,
    image: {
      ...t.image,
      url: NEXT_PUBLIC_STRAPI_URL + t.image?.url,
    },
  }));

  return { props: { initialPosts: posts, initialThemes: themes } };
}

export default Home;
