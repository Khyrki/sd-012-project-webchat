const dataFunc = (date) => {
  const mo = new Intl.DateTimeFormat('pt-br', { 
    dateStyle: 'short', 
    hour12: 'true', 
    timeStyle: 'medium',
  }).format(date);
  const correctDate = mo.split('/').join('-');
  return correctDate;
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', (message) => {
      const result = `${dataFunc(new Date())} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', result);
    });
  });
