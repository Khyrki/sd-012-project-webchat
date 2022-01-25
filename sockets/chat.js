const historyModel = require('../models/history');

// Código retirado do repositório do colega Lucianl Almeida Turma 12
const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// Código retirado de "https://www.delftstack.com/pt/howto/javascript/javascript-random-string/"
const generateRandomNickname = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nickname = '';
  const charactersLength = characters.length;
  for (let index = 0; index < 16; index += 1) {
    nickname += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return nickname;
};

const currentClients = [];
  
module.exports = (io) => io.on('connection', (socket) => {
  const randomNickName = generateRandomNickname();

  currentClients.push({ id: socket.id, nickname: randomNickName });
  io.emit('clientsChange', currentClients);

  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = createDate();
    await historyModel.createMessage({ message: chatMessage, nickname, timestamp });
    io.emit('message', `${createDate()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', (nickname) => {
    const index = currentClients.indexOf(currentClients.find((client) => client.id === socket.id));
    currentClients[index].nickname = nickname;
    io.emit('clientsChange', currentClients);
  });

  socket.on('disconnect', () => {
    currentClients.splice(currentClients
      .indexOf(currentClients.find((client) => client.id === socket.id)), 1);
    socket.broadcast.emit('clientsChange', currentClients);
  });
}); 