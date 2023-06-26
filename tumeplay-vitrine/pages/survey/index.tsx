import { Box } from "@chakra-ui/react";
import { Widget } from "@typeform/embed-react";

const Survey = () => {
  return (
    <Box bg="lightPink" pb={16} minH="100vh">
      <Widget
        id="XYasnB7A"
        className="typeform"
        style={{ width: "100%", height: "100vh" }}
      />
    </Box>
  );
};

export default Survey;
