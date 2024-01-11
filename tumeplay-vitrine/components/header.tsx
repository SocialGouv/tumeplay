import { Box, Heading } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" py={10}>
      <Box w={[48, 48, "300px"]}>
        <Image
          src="/logo-tumeplay.svg"
          alt={``}
          width={300}
          height={150}
          layout="responsive"
        />
      </Box>
      <Heading
        as="h1"
        mt={[6, 6, 10]}
        mb={[4, 4, 6]}
        fontSize={["2xl", "2xl", "auto"]}
        textAlign={["center", "center", "left"]}
      >
        TU CROIS TOUT SAVOIR SUR LE{" "}
        <Box as="span" color="primary" fontSize={["3xl", "3xl", "5xl"]}>
          SEXE ?
        </Box>
      </Heading>
    </Box>
  );
};

export default Header;
