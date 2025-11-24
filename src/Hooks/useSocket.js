import { useEffect } from "react";
import socket from "./sockets/socket";

const useSocket = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;