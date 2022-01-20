// const history = [];

const dataFunc = (date) => {
  const mo = new Intl.DateTimeFormat('pt-br', { 
    dateStyle: 'short', 
    hour12: 'true', 
    timeStyle: 'medium',
  }).format(date);
  const correctDate = mo.split('/').join('-');
  return correctDate;
};

module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('message', history);

  socket.on('message', (message) => {
    const result = `${dataFunc(new Date())} - ${message.nickname}: ${message.chatMessage}`;
    // history.push(result);
    // console.log(result);

    io.emit('message', result);
  });
});
