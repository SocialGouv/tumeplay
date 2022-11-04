import { Box } from "@chakra-ui/react";
import { ThemeProps } from "./interfaces";
import Image from "next/image";

const Themes = ({ onClick, selectedThemesIds, themes }: ThemeProps) => {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      {themes.map((theme) => {
        const isSelected = selectedThemesIds.includes(theme.id);
        return (
          <Box
            key={theme.id}
            bg={isSelected ? theme.border_color : theme.color}
            textColor={isSelected ? "white" : "black"}
            borderWidth={1}
            borderColor={theme.border_color}
            borderRadius="md"
            px={2}
            py={2}
            mr={2}
            mb={2}
            cursor="pointer"
            display="flex"
            alignItems="center"
            onClick={() => onClick(theme.id)}
          >
            <Box mr={2} w={6}>
              <Image
                loader={() => theme.image.url}
                src={theme.image.url}
                alt={``}
                width={6}
                height={6}
                layout="responsive"
              />
            </Box>
            {theme.title}
          </Box>
        );
      })}
    </Box>
  );
};

export default Themes;
