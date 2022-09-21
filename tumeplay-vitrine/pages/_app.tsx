import "@fontsource/montserrat/800.css";
import "@fontsource/source-sans-pro/400.css";

import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { extendedTheme } from "../utils/chakra-theme";

import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL as string;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID as string;
const theme = extendTheme(extendedTheme);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
