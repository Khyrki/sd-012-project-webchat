const MessageSocket = require('./MessageSocket');

class RootSocket {
  constructor(io) {
    this.io = io;
  }

  execute() {
    this.io.on('connection', (socket) => {
      new MessageSocket(this.io, socket).handle();
    });
  }
}

module.exports = RootSocket;
