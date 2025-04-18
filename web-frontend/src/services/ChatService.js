import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // your chat_server port

export default socket;
