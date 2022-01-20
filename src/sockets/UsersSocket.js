class UserSocket {
  constructor(io, serverState, events) {
    this.io = io;
    this.serverState = serverState;
    this.events = events;
  }

  handle() {
    this.io.emit(this.events.users, this.serverState.users);
  }
}

module.exports = UserSocket;
