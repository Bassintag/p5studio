import { io } from "socket.io-client";
import { store } from "./store";
import { upsertSketches } from "./features/sketch/sketchSlice";

export const setupSocket = () => {
  const socket = io({
    host: "localhost",
    port: 3000,
  });

  socket.on("message", (event, data) => {
    console.log("Message: ", event, data);
    switch (event) {
      case "sketches":
        store.dispatch(upsertSketches(data));
        break;
      case "sketchChanged":
        store.dispatch(upsertSketches([data]));
        break;
    }
  });
};
