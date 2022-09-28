import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setupSocket } from "./socket";
import { Provider } from "react-redux";
import { store } from "./store";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

setupSocket();
