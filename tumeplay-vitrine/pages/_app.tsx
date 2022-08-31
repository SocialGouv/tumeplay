import "@fontsource/montserrat/800.css";
import "@fontsource/source-sans-pro/400.css";

import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { extendedTheme } from "../utils/chakra-theme";

const theme = extendTheme(extendedTheme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
