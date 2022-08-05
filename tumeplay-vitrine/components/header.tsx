import { Box, Image, Heading, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" py={10}>
      <Image src="/logo-tumeplay.svg" alt="Tumeplay logo" />
      <Heading mt={10} mb={6}>
        TU CROIS TOUT SAVOIR SUR LE{" "}
        <Box as="span" color="primary" fontSize="5xl">
          SEXE ?
        </Box>
      </Heading>
      <Box display="flex" alignItems="center">
        <Link
          href="https://apps.apple.com/fr/app/tumeplay/id1559879813"
          target="_blank"
        >
          <Image
            mr={4}
            src="/button-ios.svg"
            alt="Télécharge tumeplay sur iOS"
            opacity={0.8}
            _hover={{ opacity: 0.6 }}
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.tumeplaymobile"
          target="_blank"
        >
          <Image
            ml={4}
            src="/button-android.svg"
            alt="Télécharge tumeplay sur Android"
            opacity={0.8}
            _hover={{ opacity: 0.6 }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
