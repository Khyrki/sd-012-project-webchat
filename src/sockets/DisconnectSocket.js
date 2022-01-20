class DisconnectSocket {
  constructor(io, socket, serverState, events) {
    this.io = io;
    this.socket = socket;
    this.serverState = serverState;
    this.events = events;
  }

  handle() {
    this.socket.on(this.events.disconnect, () => {
      this.serverState.deleteUser(this.socket.id);
      this.socket.broadcast.emit(this.events.users, this.serverState.users);
    });
  }
}

module.exports = DisconnectSocket;
