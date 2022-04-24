import { theme, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  ...theme,
  fonts: {
    body: "Akshar, sans-serif",
    heading: "Akshar, sans-serif",
    mono: "Akshar, sans-serif",
  },
  components: {
    FormLabel: { baseStyle: { mb: 0 } },
  },
});

export { customTheme };
