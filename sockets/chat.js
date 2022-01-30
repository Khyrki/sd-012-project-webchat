const clients = [];

// [PT-BR] Função para forçar os números ficarem com 2 casas caso eles só tenham 1. [EN] Function to force numbers have 2 char lenght if they have only 1.
const twoChar = (data) => (data >= 10 ? `${data}` : `0${data}`);

// [PT-BR] Função para criar o tempo em que uma mensagem foi enviada. [EN] Function to make date and time that a message was send.
const makeDateWithTime = (now = new Date()) => {
const returnDate = `${twoChar(now.getDate())}-${twoChar(now.getMonth() + 1)}`
  + `-${twoChar(now.getFullYear())} ${twoChar(now.getHours())}:${twoChar(now.getMinutes())}:`
  + `${twoChar(now.getSeconds())}`;
return returnDate;
};

const socketNewUser = (socket, io) => {
  socket.on('newUser', () => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    clients.push({ socketId: socket.id, nickname: socket.id.slice(0, 16) });
    io.emit('userList', clients);
  });
};

const socketMessage = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const returnMsg = `${makeDateWithTime()} - ${nickname}: ${chatMessage}`;
    io.emit('message', returnMsg);
  });
};

const socketNicknameChange = (socket, io) => {
  socket.on('nicknameChange', ({ oldNick, newNick }) => {
    const arrayPos = clients.findIndex((list) => list.nickname === oldNick);
    clients[arrayPos] = { ...clients[arrayPos], nickname: newNick };
    socket.emit('nicknameChange', newNick);
    io.emit('userList', clients);
  });
};

const socketDisconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const arrayPos = clients.findIndex((client) => client.socketId === socket.id);
    if (arrayPos >= 0) {
      clients.splice(arrayPos, 1);
      console.log(`o usuário ${socket.id} desconectou`);
      io.emit('userList', clients);
    }
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  socketNewUser(socket, io);
  socketMessage(socket, io);
  socketNicknameChange(socket, io);
  socketDisconnect(socket, io);
});