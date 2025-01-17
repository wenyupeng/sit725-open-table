const { Server } = require("socket.io");

class SocketIOService {
  constructor() {
    this._instance = undefined;
    this.server = undefined;
  }

  instance() {
    if (!this._instance) {
      this._instance = new SocketIOService();
    }
    return this._instance;
  }

  initialize(httpServer, opts) {
    SocketIOService.server = new Server(httpServer, opts);

    return SocketIOService.server;
  }

  ready() {
    return SocketIOService.server !== null;
  }

  getServer() {
    if (!SocketIOService.server) {
      throw new Error("IO server requested before initialization");
    }

    return SocketIOService.server;
  }

  sendMessage(roomId, key, message) {
    this.getServer().to(roomId).emit(key, message);
  }

  emitAll(key, message) {
    this.getServer().emit(key, message);
  }

  getRooms() {
    return this.getServer().sockets.adapter.rooms;
  }

  handleConnection(socket) {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("my message", (msg) => {
      console.log("message: " + msg);
    });

    socket.on("room_update", (msg) => {
      console.log("message: " + msg);
    });

    setInterval(() => {
      socket.emit("number", parseInt(Math.random() * 10));
    }, 1000);
  }
}

const socketInstance = new SocketIOService();

module.exports = socketInstance;
