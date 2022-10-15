import { useSocketContext } from "../contexts/SocketContext";
import {
  SocketMessage,
  SocketMessageType,
  SocketResponse,
} from "../../../../common/messages/SocketMessage";

export const createUseSendSocketMessageHook = <T extends SocketMessageType>(
  name: T
) => {
  return () => {
    const socket = useSocketContext();

    return (
      payload: SocketMessage<T>,
      callback?: (data: SocketResponse<T>) => void
    ) => {
      socket.emit(name, payload, callback);
    };
  };
};
