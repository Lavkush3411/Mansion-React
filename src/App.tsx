import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./uithemes/ChakraTheme";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>{" "}
    </ChakraProvider>
  );
}

export default App;
