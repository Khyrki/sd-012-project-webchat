const Session = require('../models/Session');

const changeName = require('./changeName');
const logOutUser = require('./logOutUser');

const { CONNECTION } = require('./events');

const setMessage = require('./setMessage');

const userInit = require('./userInit');

const session = new Session();

const socketServer = (io) => {
  io.on(CONNECTION, (socket) => {
    userInit(io, socket, session);

    setMessage(io, socket, session);

    changeName(io, socket, session);

    logOutUser(io, socket, session);
  });
};

module.exports = socketServer;