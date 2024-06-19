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
            bgColor: "#c7c8cc",
          },
        },
        mobilenavbar: {
          dialog: {
            bgColor: "#c7c8cc",
          },
        },
      },
    },
  },
});

export default theme;
