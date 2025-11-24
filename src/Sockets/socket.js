import { io } from "socket.io-client";

const socket = io("https://meet2explore-17e5b6e60cab.herokuapp.com/", {
  autoConnect: true,
  transports: ["websocket"]
});

export default socket;