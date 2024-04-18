import { io } from "socket.io-client";

const baseURL = "https://code-lab-backend-one.vercel.app";
// const baseURL = "http://localhost:8000";

const initSocket = async () => {
  const option = {
    "force new connection": false,
    reconnectionAttempt: false,
    timeout: 10000,
    transport: ["websocket"],
  };

  return io(baseURL, option);
};

export default initSocket;
