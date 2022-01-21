const util = require('../util/helper');

module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('serverMessage', 'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');

  // socket.broadcast.emit('serverMessage', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);

  socket.on('message', ({ nickname, chatMessage }) => {
    const message = `${util.getTimeNow()} - ${nickname}: ${chatMessage}`;
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    // socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
  });
});
