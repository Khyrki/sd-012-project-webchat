const SessionStoreMemory = require('./sessionStoreMomory');
const changeNickname = require('./changeNickname');
const handleMessage = require('./handleMessage');
const handleUser = require('./handleUser');

const sessionStore = new SessionStoreMemory();

const server = (io) => {
  io.use((socket, next) => {
    handleUser(socket, sessionStore, next);
  });
  io.on('connection', async (socket) => {
    handleMessage(io, socket, sessionStore);
    changeNickname(io, socket, sessionStore);
  });
};

module.exports = server;
