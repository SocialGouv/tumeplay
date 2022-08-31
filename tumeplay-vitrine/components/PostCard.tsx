import { Box, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { PostCardProps } from "./interfaces";
import slugify from "@sindresorhus/slugify";

const PostCard = ({ post }: PostCardProps) => {
  const slug = slugify(post.title);

  return (
    <Box
      borderWidth={1}
      borderColor="gray.300"
      borderRadius="lg"
      _hover={{ position: "relative", bottom: "2px", boxShadow: "md" }}
    >
      <Image
        src={post.etiquette?.image.url}
        alt={post.title}
        borderTopRadius="lg"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        bg={post.thematique_mobile.color}
        py={2}
      >
        <Image
          src={post.thematique_mobile.image.url}
          alt={post.thematique_mobile.title}
          w={6}
        />
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
