module.exports = (io) => {
  io.on('connection', (socket) => {
    //   console.log('conectado'); shows that we have connection - users are connected!
    socket.on('message', (msg) => {
      console.log(`Mensagem: ${msg}`);
      io.emit('message', msg);
    });
  });
};
