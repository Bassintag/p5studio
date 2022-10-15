export interface SocketContextProps {
  socket: Socket;
}

export const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = () => {
  return <SocketContext.Provider></SocketContext.Provider>
}
