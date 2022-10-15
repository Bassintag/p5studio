import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./features/socket/contexts/SocketContext";
import { NotificationsProvider } from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
