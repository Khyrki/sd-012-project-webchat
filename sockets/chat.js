const randomstring = require('randomstring');

module.exports = (io) => {
  io.on('connection', (socket) => {
    //   console.log('conectado'); shows that we have connection - users are connected!
    // console.log(socket);
    socket.emit('nickname', randomstring.generate(16)); // emits nickname from the server to one socket connection
    
    socket.on('message', (msg) => {
      console.log(`Mensagem: ${msg}`);
      io.emit('message', msg);
    });
  });
};
