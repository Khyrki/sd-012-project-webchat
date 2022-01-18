const standardDateString = (date, equalizer) => {
  return date + equalizer >= 10 ? date + equalizer : `0${date + equalizer}`;
};

const gettingDateAndTime = () => {
  const now = new Date();
  const day = standardDateString(now.getDate(), 0);
  const month = standardDateString(now.getMonth(), 1);
  const year = now.getFullYear();
  const hour = standardDateString(now.getHours(), 0);
  const minutes = standardDateString(now.getMinutes(), 0);
  const seconds = standardDateString(now.getSeconds(), 0);
  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Uma pessoa com id: ${socket.id} se conectou.`);
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = gettingDateAndTime();
      const message = `${date} ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
