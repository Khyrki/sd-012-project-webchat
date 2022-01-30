const twoChar = (data) => (data >= 10 ? `${data}` : `0${data}`);

const makeDateWithTime = () => {
const now = new Date();
const returnDate = `${twoChar(now.getDate())}-${twoChar(now.getMonth() + 1)}`
  + `-${twoChar(now.getFullYear())} ${twoChar(now.getHours())}:${twoChar(now.getMinutes())}:`
  + `${twoChar(now.getSeconds())}`;
console.log(returnDate);
return returnDate;
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const returnMsg = `${makeDateWithTime()} - ${nickname}: ${chatMessage}`;
    console.log(returnMsg);
    io.emit('message', returnMsg);
  });
});