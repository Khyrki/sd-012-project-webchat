const { createMessages } = require('../../models/messages');

module.exports = async (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    socket.on('message', async (message) => {
      const date = new Intl.DateTimeFormat(
        'pt-BR',
        { dateStyle: 'short', timeStyle: 'short', hour12: true },
        ).format(Date.now()).replace(/\//g, '-');
      const msg = `${date} - ${message.nickname}: ${message.chatMessage}`;

      io.emit('message', msg);
  
      await createMessages(message.chatMessage, message.nickname, date);
    });
  });
};
