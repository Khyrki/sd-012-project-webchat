const getFormatedDate = require('../helpers/getFormatedDate');

class MessageSocket {
  constructor(io, socket, model, events) {
    this.io = io;
    this.socket = socket;
    this.model = model;
    this.events = events;
  }

  handle() {
    this.socket.on(this.events.message, ({ chatMessage, nickname }) => {
      const message = `${getFormatedDate()} - ${nickname}: ${chatMessage}`;
      this.model.create(message);
      this.io.emit(this.events.message, message);
    });
  }
}

module.exports = MessageSocket;
