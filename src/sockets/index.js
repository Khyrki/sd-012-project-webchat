const DisconnectSocket = require('./DisconnectSocket');
const MessageSocket = require('./MessageSocket');
const UsersSocket = require('./UsersSocket');
const UserSocket = require('./UserSocket');

class RootSocket {
  constructor(io, models, serverState) {
    this.io = io;
    this.models = models;
    this.serverState = serverState;

    this.events = {
      user: 'user',
      users: 'users',
      message: 'message',
      connection: 'connection',
      disconnect: 'disconnect',
    };
  }

  execute() {
    this.io.on(this.events.connection, (socket) => {
      new UserSocket(this.io, socket, this.serverState, this.events).handle();
      new MessageSocket(this.io, socket, this.models.message, this.events).handle();
      new UsersSocket(this.io, this.serverState, this.events).handle();
      new DisconnectSocket(this.io, socket, this.serverState, this.events).handle();
    });
  }
}

module.exports = RootSocket;
