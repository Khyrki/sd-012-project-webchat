const getFormatedDate = require('../helpers/getFormatedDate');

class MessageSocket {
  constructor(io, socket, model) {
    this.io = io;
    this.socket = socket;
    this.model = model;
    this.event = 'message';
  }

  handle() {
    this.socket.on(this.event, ({ chatMessage, nickname }) => {
      const message = `${getFormatedDate()} - ${nickname}: ${chatMessage}`;

      this.model.create(message);

      this.io.emit(
        this.event,
        message,
      );
    });
  }
}

module.exports = MessageSocket;
