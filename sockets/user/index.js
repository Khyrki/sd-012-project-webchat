const user = require('./user');

module.exports = (io) => {
  io.on('connection', (socket) => user(io, socket));
};