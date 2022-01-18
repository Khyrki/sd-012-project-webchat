module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Uma pessoa se conectou.');
  });
};
