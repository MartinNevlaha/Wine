let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {origins: "http://localhost:3000"}); 
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
