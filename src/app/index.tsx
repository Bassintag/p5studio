import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setupSocket } from "./socket";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

setupSocket();
