import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./uithemes/ChakraTheme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>{" "}
    </ChakraProvider>
  );
}

export default App;
