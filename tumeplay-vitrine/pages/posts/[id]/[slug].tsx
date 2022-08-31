import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { PostCardProps } from "../../../components/interfaces";
import Head from "next/head";

const ThemePage = ({ post }: PostCardProps) => {
  return (
    <Box bg={post.thematique_mobile.color} pt={4} pl={3}>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} key="title" />
        <meta
          property="og:description"
          content="Tumeplay, Tu crois tout savoir sur le SEXE ?"
          key="description"
        />
        <meta property="og:image" content="/logo-tumeplay.svg" key="image" />
        <meta property="og:url" content="https://tumeplay.com" key="url" />
        <link rel="icon" href="/logo-tumeplay.svg" />
      </Head>
      <Container
        maxW="3xl"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          justifyContent="center"
          alignContent="center"
          bg="gray.50"
          px={5}
          py={3}
          backdropFilter="invert(100%)"
          borderRadius={8}
          shadow="2xl"
        >
          <Heading as={"h1"} my={3}>
            {post.title}
          </Heading>
          <Flex>
            <Image
              src={post.etiquette?.image.url}
              alt={post.title}
              borderRadius="lg"
              w="50%"
              h="50%"
            />
            <Box ml={5}>
              <Flex
                h="fit-content"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                bg={post.thematique_mobile.color}
                py={2}
                mb={2}
              >
                <Image
                  src={post.thematique_mobile.image.url}
                  alt={post.thematique_mobile.title}
                  w={10}
                  p={1}
                  mr={3}
                />
                <Text fontWeight="bold" fontSize="3xl">
                  {post.thematique_mobile.title}
                </Text>
              </Flex>
              <Box borderRadius="md" h="auto" p={2}>
                <Text justifyContent="center" fontSize="md" textAlign="start">
                  {post.text}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context: { query: { id: string } }) {
  const NEXT_STRAPI_URL = process.env.NEXT_STRAPI_URL as string;
  const { id } = context.query;
  const response = await axios.get(`${NEXT_STRAPI_URL}/contents/${id}`);
  const post = {
    ...response.data,
    image: {
      ...response.data.image,
      url: NEXT_STRAPI_URL + response.data.image.url,
    },
    etiquette: {
      ...response.data.etiquette,
      image: {
        ...response.data.etiquette.image,
        url: NEXT_STRAPI_URL + response.data.etiquette.image.url,
      },
    },
    thematique_mobile: {
      ...response.data.thematique_mobile,
      image: {
        ...response.data.thematique_mobile.image,
        url: NEXT_STRAPI_URL + response.data.thematique_mobile.image.url,
      },
    },
  };
  return {
    props: {
      post,
    },
  };
}

export default ThemePage;
