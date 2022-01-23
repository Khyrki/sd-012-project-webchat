const Session = require('../models/Session');
const changeName = require('./changeName');
const disconnectUser = require('./disconnectUser');
const { CONNECTION } = require('./events');
const serializeMessage = require('./serializeMessage');
const userInit = require('./userInit');

const session = new Session();

const socketServer = (io) => {
  io.on(CONNECTION, (socket) => {
    userInit(io, socket, session);

    serializeMessage(io, socket, session);

    changeName(io, socket, session);

    disconnectUser(io, socket, session);
  });
};

module.exports = socketServer;
