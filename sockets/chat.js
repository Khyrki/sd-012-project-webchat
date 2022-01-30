const moment = require('moment');

const chat = (io) => {
    io.on('connection', (socket) => {  
        socket.on('message', (message) => {
            const date = moment(new Date()).format('DD-MM-YYYY HH:MM:SS A'); //  https://momentjs.com/docs/#/use-it/node-js/
            
            const text = `${date}  - ${message.nickname}: ${message.chatMessage}`;
            
            io.emit('message', text); 
        });
    });
  };
  
  module.exports = chat; 
