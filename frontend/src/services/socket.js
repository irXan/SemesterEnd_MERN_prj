import io from "socket.io-client";

let socket;

const getSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      autoConnect: false,
      auth: { token },
    });
  } else if (token !== undefined) {
    socket.auth = { token };
  }

  return socket;
};

export const connectSocket = (token) => {
  const activeSocket = getSocket(token);

  if (!token) {
    return activeSocket;
  }

  activeSocket.auth = { token };

  if (!activeSocket.connected) {
    activeSocket.connect();
  }

  return activeSocket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export default getSocket;
