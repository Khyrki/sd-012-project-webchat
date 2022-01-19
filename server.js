// Faça seu código aqui.
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.set('view engine', 'ejs');
app.set('views', './public/views');

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatPageController = require('./controllers/chatPage');
const getFullDate = require('./helps/getFullDate');
const { create } = require('./models/chat');

app.use('/', chatPageController);

const usersInfo = [];

const emitMessageToAll = ({ nickname, chatMessage }) => {
  const fullDate = getFullDate();

  const message = `${fullDate} - ${nickname}: ${chatMessage}`;

  usersInfo.forEach((client) => {
    client.socket.emit('message', message);
  });
};

const saveMessageToHistory = async ({ chatMessage, nickname }) => {
  const fullDate = getFullDate();

  const newMessage = {
    message: chatMessage,
    nickname,
    timestamp: fullDate,
  };

  const messageSaved = await create(newMessage);

  return messageSaved;
};

const sendUserList = () => {
  console.log(usersInfo);
  io.emit('users', usersInfo);
};

const onDisconnect = (socket) => {
  const user = usersInfo.find((userInfo) => userInfo.socketId === socket.id);
  const userIndex = usersInfo.indexOf(user);
  usersInfo.splice(userIndex, 1);

  sendUserList();
};

const changeNickname = (newNickname, socket) => {
  const user = usersInfo.find((userInfo) => userInfo.socketId === socket.id);
  const userIndex = usersInfo.indexOf(user);
  user.nickname = newNickname;
  usersInfo.splice(userIndex, 1, user);

  sendUserList();
};

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    saveMessageToHistory(data);
    emitMessageToAll(data);
  });

  socket.on('userConnected', (nickname) => {
    const newUser = { socketId: socket.id, nickname };
    usersInfo.push(newUser);   
    sendUserList();
  });

  socket.on('changeNickname', (newNickname) => {
    changeNickname(newNickname, socket);
  });

  socket.on('disconnect', () => {
    onDisconnect(socket);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
