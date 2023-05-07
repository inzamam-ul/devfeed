import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      // 100: "#3fbdea",
      // 100: "#3c78e7",
      100: "#3a5ae8",
    },
  },
  // width: {
  //   container: {
  //     800: "860px",
  //     900: "960px",
  //     1000: "1060px",
  //   },
  // },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
      "*:focus": {
        boxShadow: "none !important",
      },
      "*[data-focus]": {
        boxShadow: "none !important",
      },
    }),
  },
  components: {
    Button,
  },
});
