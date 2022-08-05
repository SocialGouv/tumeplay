import { Box, Image, Text } from "@chakra-ui/react";
import { Post } from "../pages/api/posts/types";
import { PostCardProps } from "./interfaces";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Box
      borderWidth={1}
      borderColor="gray.300"
      borderRadius="md"
      _hover={{ position: "relative", bottom: "2px", boxShadow: "md" }}
    >
      <Image src={post.etiquette?.image.url} alt={post.title} />
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
        <Text fontSize="2xl" noOfLines={2} h={20}>
          {post.title_mobile}
        </Text>
        <Text>{post.text}</Text>
      </Box>
    </Box>
  );
};

export default PostCard;
