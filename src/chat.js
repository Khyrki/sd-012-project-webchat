const { createMsg } = require('../models');

module.exports = async (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      const date = new Intl.DateTimeFormat(
        'pt-BR',
        {
          dateStyle: 'short',
          timeStyle: 'short',
          hour12: true,
        },
        ).format(Date.now()).replace(/\//g, '-');
      const mensagem = `${date} - ${message.nickname}: ${message.chatMessage}`;

      io.emit('message', mensagem);
      await createMsg(message.chatMessage, message.nickname, date);
    });
  });
};