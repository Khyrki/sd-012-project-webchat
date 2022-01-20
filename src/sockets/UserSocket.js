const generate16Char = require('../helpers/generate16Char');

class UserSocket {
  constructor(io, socket, serverState, events) {
    this.io = io;
    this.socket = socket;
    this.serverState = serverState;
    this.events = events;
  }

  handle() {
    const randomName = generate16Char();
    this.socket.emit(this.events.user, randomName);
    this.serverState.user = { id: this.socket.id, nickname: randomName };

    this.socket.on(this.events.user, ({ nickname }) => {
      this.socket.emit(this.events.user, nickname);
      this.serverState.updateUser({ id: this.socket.id, nickname });
      this.io.emit(this.events.users, this.serverState.users);
    });
  }
}

module.exports = UserSocket;
