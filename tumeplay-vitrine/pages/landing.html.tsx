import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirection = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return <></>;
};

export default Redirection;
