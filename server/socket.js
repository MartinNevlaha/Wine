let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {origins: `http://${process.env.HOST}`}); 
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
