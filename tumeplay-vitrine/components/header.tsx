import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" py={10}>
      <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" />
      <Heading mt={10}>
        TU CROIS TOUT SAVOIR SUR LE{" "}
        <Box as="span" color="primary" fontSize="5xl">
          SEXE ?
        </Box>
      </Heading>
    </Box>
  );
};

export default Header;
