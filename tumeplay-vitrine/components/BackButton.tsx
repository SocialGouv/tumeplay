import { Button } from "@chakra-ui/react";
import { BackButtonProps } from "./interfaces";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const BackButton = ({ text }: BackButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (router.events) {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }

  return (
    <Button
      onClick={() => {
        router.push("/");
      }}
      rounded="xl"
      borderColor="#dadada"
      borderWidth={1}
      isLoading={loading}
    >
      <ArrowBackIcon mr={1} />
      {text || "Retour"}
    </Button>
  );
};

export default BackButton;
