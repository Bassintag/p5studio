import {
  SaveSketchMessage,
  SaveSketchResponse,
} from "@common/messages/SaveSketchMessage";

export interface SocketMessages {
  ["save"]: {
    message: SaveSketchMessage;
    response: SaveSketchResponse;
  };
}

export type SocketMessageType = keyof SocketMessages;

export type SocketMessage<T extends SocketMessageType> =
  SocketMessages[T]["message"];

export type SocketResponse<T extends SocketMessageType> =
  SocketMessages[T]["response"];
