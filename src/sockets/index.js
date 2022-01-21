const chat = require('./chat');
const user = require('./user');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado`);

    user(io, socket);
    chat(io, socket);
  });
};