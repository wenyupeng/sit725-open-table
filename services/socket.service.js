const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

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
    console.log(`[SocketIOService] sendMessage to room: ${roomId} key: ${key} message: ${JSON.stringify(message)} `)
    this.getServer().to(roomId).emit(key, JSON.stringify(message));
  }

  emitAll(key, message) {
    this.getServer().emit(key, message);
  }

  getRooms() {
    return this.getServer().sockets.adapter.rooms;
  }

  handleConnection(socket) {
    const token = socket.handshake.query["token"];
    let user;

    // @TODO: check jwt in handshake layer, not here.
    try {
      user = jwt.verify(token, process.env.SIGN_KEY);
    } catch {
      socket.disconnect();
      return;
    }

    console.log(`[SocketIOService] join user-${user._id}`)
    socket.join(`user-${user._id}`);
    if (user.merchant?._id && user.role === "merchant") {
      console.log(`[SocketIOService] join merchant-${user.merchant._id}`)
      socket.join(`merchant-${user.merchant._id}`);
    }

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }
}

const socketInstance = new SocketIOService();

module.exports = socketInstance;
