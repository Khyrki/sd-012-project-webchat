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
  
module.exports = (io) => io.on('connection', (socket) => {
  const randomNickName = generateRandomNickname();

  socket.emit('newConnection', { nickname: randomNickName, id: socket.id });

  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${createDate()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', (nickname) => {
    io.emit('changeNickname', { id: socket.id, newNickname: nickname });
  });
}); 