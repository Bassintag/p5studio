import { io } from "socket.io-client";
import { store } from "./store";
import { setRootFolder } from "./features/files/filesSlice";
import { loadSketch } from "./services/sketchService";

export const setupSocket = () => {
  const socket = io({
    host: "localhost",
    port: 3000,
  });

  socket.on("message", (event, data) => {
    console.log("Message: ", event, data);
    switch (event) {
      case "files":
        store.dispatch(setRootFolder(data));
        break;
      case "fileChange":
        if (store.getState().sketch.autoRefresh) {
          loadSketch(data);
        }
        break;
    }
  });

  return socket;
};
