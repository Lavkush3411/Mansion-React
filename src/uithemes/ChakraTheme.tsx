import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  components: {
    Drawer: {
      parts: ["dialog", "header", "body"],
      variants: {
        cart: {
          dialog: {
            maxW: "350px",
            minW: "350px",
          },
        },
      },
    },
  },
});

export default theme;
