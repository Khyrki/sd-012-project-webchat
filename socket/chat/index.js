const chat = require('./chat');
const users = require('./users');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Cliente de ID "${socket.id}" se conectou!`);
    
    chat(io, socket);
    
    users(io, socket);
  });
};