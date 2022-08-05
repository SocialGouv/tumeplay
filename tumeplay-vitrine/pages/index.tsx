import type { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post, Theme, ZPost } from "./api/posts/types";
import {
  Box,
  Container,
  Spinner,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import Header from "../components/header";
import Themes from "../components/themes";
import PostCard from "../components/card";
import { useDebounce } from "usehooks-ts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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

  return (
    <Box bg="lightPink" pb={16} minH="100vh">
      <Container maxW="6xl">
        <Header />
        <InputGroup size="lg">
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Contraception, clitoris, consentement..."
            mb={10}
            value={search || ""}
          />
          {search && (
            <InputRightElement cursor="pointer" onClick={() => setSearch("")}>
              <CloseIcon />
            </InputRightElement>
          )}
        </InputGroup>
        <Themes
          onClick={handleThemeClick}
          selectedThemesIds={selectedThemesIds}
          themes={themes}
        />
        {isLoading ? (
          <Spinner
            size="xl"
            color="primary"
            mx="auto"
            display="block"
            mt={16}
          />
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
  const NEXT_STRAPI_URL = process.env.NEXT_STRAPI_URL as string;
  let response = await axios.get(`${NEXT_STRAPI_URL}/contents`, {
    params: {
      _start: 0,
      _limit: 36,
      title_mobile_null: false,
      thematique_mobile_null: false,
    },
  });
  const posts = (response.data || []).map((c: Post) => ({
    ...c,
    image: { ...c.image, url: NEXT_STRAPI_URL + c.image?.url },
    thematique_mobile: {
      ...c.thematique_mobile,
      image: {
        ...c.thematique_mobile.image,
        url: NEXT_STRAPI_URL + c.thematique_mobile.image.url,
      },
    },
    etiquette: {
      ...c.etiquette,
      image: {
        ...c.etiquette?.image,
        url: NEXT_STRAPI_URL + c.etiquette?.image.url,
      },
    },
  }));

  response = await axios.get(`${NEXT_STRAPI_URL}/thematique-mobiles`, {
    params: {
      _start: 0,
      _limit: 100,
    },
  });
  const themes = (response.data || []).map((t: Theme) => ({
    ...t,
    image: {
      ...t.image,
      url: NEXT_STRAPI_URL + t.image.url,
    },
  }));

  return { props: { initialPosts: posts, initialThemes: themes } };
}

export default Home;
