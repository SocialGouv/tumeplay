import { Box, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" py={10}>
      <Box w={[48, 48, "300px"]}>
        <Image
          src="/logo-tumeplay.svg"
          alt="Tumeplay logo"
          width={300}
          height={150}
          layout="responsive"
        />
      </Box>
      <Heading
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
      <Box
        display="flex"
        alignItems="center"
        flexDirection={["column", "column", "row"]}
      >
        <Link
          href="https://apps.apple.com/fr/app/tumeplay/id1559879813"
          target="_blank"
          rel="noreferrer"
        >
          <Box mr={4} opacity={0.8} _hover={{ opacity: 0.6 }} w={52}>
            <Image
              width={200}
              height={80}
              layout="responsive"
              src="/button-ios.svg"
              alt="Télécharge tumeplay sur iOS"
            />
          </Box>
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.tumeplaymobile"
          target="_blank"
          rel="noreferrer"
        >
          <Box
            ml={[0, 0, 4]}
            mt={[4, 4, 0]}
            opacity={0.8}
            _hover={{ opacity: 0.6 }}
            w={52}
          >
            <Image
              width={200}
              height={80}
              layout="responsive"
              src="/button-android.svg"
              alt="Télécharge tumeplay sur Android"
            />
          </Box>
        </Link>
      </Box>
      <Box pt={5}>
        <Text fontWeight="bold" textAlign={["center", "center", "left"]}>
          Retrouve-nous sur les réseaux sociaux pour découvrir nos actualités
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
          pt={2}
        >
          <Link
            href="https://www.instagram.com/tumeplay/"
            rel="noreferrer"
            target="_blank"
          >
            <Box mr={2} opacity={1} _hover={{ opacity: 0.8 }} w={12}>
              <Image
                src="/instagram.png"
                alt="Instgram Tumeplay"
                width={50}
                height={50}
                layout="responsive"
              />
            </Box>
          </Link>
          <Link
            href="https://www.tiktok.com/@tu.me.play"
            target="_blank"
            rel="noreferrer"
            w={12}
            opacity={1}
            _hover={{ opacity: 0.8 }}
          >
            <Image
              src="/Tiktok.png"
              alt="Instgram TikTok"
              width={50}
              height={50}
              layout="responsive"
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
