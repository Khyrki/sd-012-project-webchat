const generate16Char = require('../helpers/generate16Char');

class SendNicknameSocket {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.event = 'nickname';
  }

  handle() {
    this.socket.emit(this.event, { nickname: generate16Char() });
  }
}

module.exports = SendNicknameSocket;
