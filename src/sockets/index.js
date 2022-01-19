const MessageSocket = require('./MessageSocket');
const SendNicknameSocket = require('./SendNicknameSocket');

class RootSocket {
  constructor(io) {
    this.io = io;
  }

  execute() {
    this.io.on('connection', (socket) => {
      new MessageSocket(this.io, socket).handle();
      new SendNicknameSocket(this.io, socket).handle();
    });
  }
}

module.exports = RootSocket;
