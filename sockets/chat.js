const getTime = require('../utils/getTime');
const nameGenerator = require('../utils/nameGenerator');

const { newMessage, getAll } = require('../controllers/chat');

let nicknames = [];

const newMessageHandler = async (io, nickname, chatMessage) => {
  const { data, hour } = getTime();
  io.emit('message', `${data} ${hour} - ${nickname}: ${chatMessage}`);
  await newMessage({ timestamp: `${data} ${hour}`, nickname, chatMessage });
};

const sendHistoryMessages = (io, messages) => {
  messages.forEach((
    { timestamp, nickname, message: chatMessage },
  ) => io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`));
};

const changeNicknameHandler = (io, newNickname, randomNickname) => {
  const index = nicknames.indexOf(randomNickname);
  nicknames[index] = newNickname;
  io.emit('userConnection', nicknames);
  return newNickname;
};

module.exports = (io) => io.on('connection', async (socket) => {
  let randomNickname = nameGenerator();
  nicknames.push(randomNickname);
  const messages = await getAll();
  
  io.emit('userConnection', nicknames);

  const socketNicknames = nicknames.reverse();
  socket.emit('userConnection', socketNicknames);

  sendHistoryMessages(io, messages);
  
  socket.on('message', async (
    { nickname = randomNickname, chatMessage },
  ) => newMessageHandler(io, nickname, chatMessage));

  socket.on('changeNickname', (newNickname) => {
    randomNickname = changeNicknameHandler(io, newNickname, randomNickname);
  });

  socket.on('disconnect', () => {
    nicknames = nicknames.filter((nickname) => nickname !== randomNickname);
    io.emit('userConnection', nicknames);
  });
});