let clients = [];

const twoChar = (data) => (data >= 10 ? `${data}` : `0${data}`);

const makeDateWithTime = () => {
const now = new Date();
const returnDate = `${twoChar(now.getDate())}-${twoChar(now.getMonth() + 1)}`
  + `-${twoChar(now.getFullYear())} ${twoChar(now.getHours())}:${twoChar(now.getMinutes())}:`
  + `${twoChar(now.getSeconds())}`;
console.log(returnDate);
return returnDate;
};

const socketMessage = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const returnMsg = `${makeDateWithTime()} - ${nickname}: ${chatMessage}`;
    console.log(returnMsg);
    io.emit('message', returnMsg);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', () => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    clients.push({ socketId: socket.id, nickname: socket.id.slice(0, 16) });
    io.emit('userList', clients);
    // console.log(JSON.stringify(clients));
    console.log(clients.length);
  });
  socketMessage(socket, io);

  socket.on('nicknameChange', ({ oldNick, newNick }) => {
    const arrayPos = clients.findIndex((list) => list.nickname === oldNick);
    clients[arrayPos] = { ...clients[arrayPos], nickname: newNick };
    socket.emit('nicknameChange', newNick);
    io.emit('userList', clients);
  });
  
  socket.on('disconnect', () => {
    clients = clients.filter(({ socketId }) => socketId !== socket.id);
    console.log(`o usuário ${socket.id} desconectou`);
    io.emit('userList', clients);
  });
});