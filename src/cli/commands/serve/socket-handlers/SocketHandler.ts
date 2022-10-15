import { Socket } from "socket.io";
import {
  SocketMessage,
  SocketMessageType,
  SocketResponse,
} from "../../../../common/messages/SocketMessage";

export abstract class SocketHandler<
  T extends SocketMessageType = SocketMessageType
> {
  protected constructor(private readonly event: T) {}

  on(socket: Socket): void {
    socket.on(
      this.event as string,
      async (data: SocketMessage<T>, callback) => {
        const response = await this.handleMessage(data);
        callback(response);
      }
    );
  }

  protected abstract handleMessage(
    data: SocketMessage<T>
  ): SocketResponse<T> | Promise<SocketResponse<T>>;
}
