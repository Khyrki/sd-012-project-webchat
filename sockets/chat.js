const getTime = require('../utils/getTime');
const nameGenerator = require('../utils/nameGenerator');

const { newMessage, getAll } = require('../controllers/chat');

const nicknames = [];

module.exports = (io) => io.on('connection', async (socket) => {
  let randomNickname = nameGenerator();
  nicknames.push(randomNickname);

  const messages = await getAll();

  io.emit('userConnection', nicknames);

  messages.forEach(({ timestamp, nickname, message: chatMessage }) => {
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('message', async (message) => {
    const { data, hour } = getTime();
    const { nickname = randomNickname, chatMessage } = message;
    io.emit('message', `${data} ${hour} - ${nickname}: ${chatMessage}`);
    await newMessage({ timestamp: `${data} ${hour}`, nickname, chatMessage });
  });

  socket.on('changeNickname', (newNickname) => {
    const index = nicknames.indexOf(randomNickname);
    nicknames[index] = newNickname;
    randomNickname = newNickname;
  });
});