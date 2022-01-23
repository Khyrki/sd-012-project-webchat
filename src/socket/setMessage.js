const setMessage = (io, socket, _session) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateObj = new Date();
    const date = dateObj.toLocaleString('pt-BR').replace(/\//g, '-');
    const message = `${date} - ${nickname} ${chatMessage}`;
    io.emit('message', message);
  });
};

module.exports = setMessage;
