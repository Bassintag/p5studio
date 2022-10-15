import { createContext, useContext, useEffect, useMemo } from "react";
import { Socket } from "socket.io-client";
import { setupSocket } from "../../../socket";

export type SocketContextProps = Socket;

export const SocketContext = createContext<SocketContextProps | null>(null);

export interface SocketProviderProps {
  children?: React.ReactElement;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useMemo(() => {
    return setupSocket();
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext) as SocketContextProps;
};
