const crypto = require('crypto');

const { createMessages, getMessages } = require('../../models/messages');

module.exports = async (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      const date = new Intl.DateTimeFormat(
        'pt-BR',
        { dateStyle: 'short', timeStyle: 'short', hour12: true },
        ).format(Date.now()).replace(/\//g, '-');
      const msg = `${date} - ${message.nickname}: ${message.chatMessage}`;

      io.emit('message', msg);
  
      await createMessages(message.chatMessage, message.nickname, date);
    });

    socket.on('user', () => {
      io.emit('user', crypto.randomBytes(8).toString('hex'));
    });

    socket.on('messagesHistory', async () => {
      const messages = await getMessages();
      io.emit('messagesHistory', messages);
    });
  });
};
