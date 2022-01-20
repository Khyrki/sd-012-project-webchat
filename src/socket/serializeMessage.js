const MessageModel = require('../models/MessageModel');

const Message = new MessageModel();

const serializeMessage = (io, socket, _session) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const dateObj = new Date();
    const date = dateObj.toLocaleString('pt-BR').replace(/\//g, '-');
    const message = `${date} - ${nickname} ${chatMessage}`;
    
    await Message.insertMessage(chatMessage, nickname, date);
    
    io.emit('message', message);
  });
};

module.exports = serializeMessage;
