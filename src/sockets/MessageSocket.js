const getFormatedDate = require('../helpers/getFormatedDate');

class MessageSocket {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.event = 'message';
  }

  handle() {
    this.socket.on(this.event, ({ chatMessage, nickname }) => {
      this.io.emit(
        this.event,
        `${getFormatedDate()} - ${nickname}: ${chatMessage}`,
      );
    });
  }
}

module.exports = MessageSocket;
