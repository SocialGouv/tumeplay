import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { PostCardProps } from "./interfaces";
import slugify from "@sindresorhus/slugify";
import Image from "next/image";

const PostCard = ({ post }: PostCardProps) => {
  const slug = slugify(post.title);

  return (
    <Box
      borderWidth={1}
      borderColor="gray.300"
      borderRadius="lg"
      _hover={{ position: "relative", bottom: "2px", boxShadow: "md" }}
    >
      <Box borderTopRadius="lg" overflow="hidden">
        <Image
          loader={() => post.etiquette?.image.url as string}
          src={post.etiquette?.image.url as string}
          alt={``}
          width={300}
          height={300}
          layout="responsive"
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        bg={post.thematique_mobile.color}
        py={2}
      >
        <Box w={6}>
          <Image
            loader={() => post.thematique_mobile.image.url}
            src={post.thematique_mobile.image.url}
            alt={``}
            width={24}
            height={24}
            layout="responsive"
          />
        </Box>
        <Text ml={1}>{post.thematique_mobile.title}</Text>
      </Box>
      <Box p={3}>
        <NextLink
          href={{
            pathname: `/posts/${post.id}/${slug}`,
          }}
          passHref
        >
          <Link fontSize="2xl" mb={1} cursor="pointer">
            {post.title_mobile}
          </Link>
        </NextLink>
        <Text>{post.text}</Text>
      </Box>
    </Box>
  );
};

export default PostCard;
