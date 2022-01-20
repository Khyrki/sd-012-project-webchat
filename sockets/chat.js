const getTime = require('../utils/getTime');
const nameGenerator = require('../utils/nameGenerator');

const { newMessage, getAll } = require('../controllers/chat');

let nicknames = [];

const messageSocket = (socket, randomNickname, io) => {
  socket.on('message', async ({ nickname = randomNickname, chatMessage }) => {
    const { data, hour } = getTime();
    io.emit('message', `${data} ${hour} - ${nickname}: ${chatMessage}`);
    await newMessage({ timestamp: `${data} ${hour}`, nickname, chatMessage });
  });
};

const updateMessages = (messages, io) => {
  messages.forEach((
    { timestamp, nickname, message: chatMessage },
  ) => io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`));
};

module.exports = (io) => io.on('connection', async (socket) => {
  let randomNickname = nameGenerator();
  nicknames.push(randomNickname);
  const messages = await getAll();
  
  io.emit('userConnection', nicknames);

  const socketNicknames = nicknames.reverse();
  socket.emit('userConnection', socketNicknames);

  updateMessages(messages, io);
  
  messageSocket(socket, randomNickname, io);

  socket.on('changeNickname', (newNickname) => {
    const index = nicknames.indexOf(randomNickname);
    nicknames[index] = newNickname;
    randomNickname = newNickname;
    io.emit('userConnection', nicknames);
  });

  socket.on('disconnect', () => {
    nicknames = nicknames.filter((nickname) => nickname !== randomNickname);
    io.emit('userConnection', nicknames);
  });
});