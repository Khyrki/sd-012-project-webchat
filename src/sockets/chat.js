const customMessage = require('../helpers/formatMessage');

module.exports = (io) => {
  io.on('connection', (socket) => {    
    console.log(socket.id);
    socket.on('message', ({ chatMessage, nickname }) => {      
      console.log(nickname);
      io.emit('message', customMessage(chatMessage, nickname));
      console.log(customMessage(chatMessage, nickname));
    });
  });
};