const MessageSocket = require('./MessageSocket');
const SendNicknameSocket = require('./SendNicknameSocket');

class RootSocket {
  constructor(io, models) {
    this.io = io;
    this.models = models;
  }

  execute() {
    this.io.on('connection', (socket) => {
      new MessageSocket(this.io, socket, this.models.message).handle();
      new SendNicknameSocket(this.io, socket).handle();
    });
  }
}

module.exports = RootSocket;
