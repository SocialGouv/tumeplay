import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { PostCardProps } from "../../../components/interfaces";
import Head from "next/head";
import BackButton from "../../../components/BackButton";

const ThemePage = ({ post }: PostCardProps) => {
  return (
    <Box bg={post.thematique_mobile.color}>
      <Head>
        <title>{"Tumeplay : " + post.title}</title>
        <meta
          property="og:title"
          content={"Tumeplay : " + post.title}
          key="title"
        />
        <meta
          property="og:description"
          content={
            post.text.length >= 60
              ? post.text.substring(0, 60) + "..."
              : post.text
          }
          key="description"
        />
        <meta property="og:image" content="/logo-tumeplay.svg" key="image" />
        <meta property="og:url" content="https://tumeplay.com" key="url" />
        <link rel="icon" href="/logo-tumeplay.svg" />
      </Head>
      <Container
        maxW={["auto", "auto", "3xl"]}
        h={["auto", "auto", "100vh"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        pt={[4, 4, 0]}
      >
        <Box mb={4}>
          <BackButton />
        </Box>
        <Box
          justifyContent="center"
          alignContent="center"
          bg="gray.50"
          px={5}
          py={3}
          backdropFilter="invert(100%)"
          borderRadius={8}
          shadow="2xl"
          mb={[8, 8, 0]}
        >
          <Heading as={"h1"} my={3}>
            {post.title}
          </Heading>
          <Flex flexDirection={["column", "column", "row"]}>
            <Image
              src={post.etiquette?.image.url}
              alt={post.title}
              borderTopRadius="md"
              borderBottomRadius={["none", "none", "md"]}
              w={["auto", "auto", "50%"]}
              h={["auto", "auto", "50%"]}
            />
            <Box ml={[0, 0, 5]}>
              <Flex
                alignItems="center"
                justifyContent="center"
                borderBottomRadius="md"
                borderTopRadius={["none", "none", "md"]}
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
              <Box borderRadius="md" h="auto">
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
  const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;
  const { id } = context.query;
  const response = await axios.get(`${NEXT_PUBLIC_STRAPI_URL}/contents/${id}`);
  const post = {
    ...response.data,
    image: {
      ...response.data.image,
      url: NEXT_PUBLIC_STRAPI_URL + response.data.image.url,
    },
    etiquette: {
      ...response.data.etiquette,
      image: {
        ...response.data.etiquette.image,
        url: NEXT_PUBLIC_STRAPI_URL + response.data.etiquette.image.url,
      },
    },
    thematique_mobile: {
      ...response.data.thematique_mobile,
      image: {
        ...response.data.thematique_mobile.image,
        url: NEXT_PUBLIC_STRAPI_URL + response.data.thematique_mobile.image.url,
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
