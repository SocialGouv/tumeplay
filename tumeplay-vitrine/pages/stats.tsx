import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

const Stats = () => {
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (document) setHeight(document.documentElement.scrollHeight - 100 + "px");
  });

  return (
    <Box>
      <Box my={4}>
        <BackButton />
      </Box>
      <iframe
        src="https://metabase-tumeplay.fabrique.social.gouv.fr/public/dashboard/4873f6fc-219b-4d7c-947f-3fe29659329d"
        width="100%"
        height={height}
      ></iframe>
    </Box>
  );
};

export default Stats;
