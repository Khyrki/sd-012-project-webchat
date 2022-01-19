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

const connectedSockets = [];
let usersInfo = [];

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
  connectedSockets.forEach((socket) => {
    socket.emit('users', usersInfo);
  });
};

const onDisconnect = (socket) => {
  const newUserList = usersInfo.filter((userInfo) => userInfo.socketId !== socket.id);
  usersInfo = newUserList;
  sendUserList();
};

const changeNickname = (newNickname, socket) => {
  const users = usersInfo.filter((userInfo) => userInfo.socketId !== socket.id);
  const newUser = { socketId: socket.id, nickname: newNickname };
  users.push(newUser);
  usersInfo = users;
  sendUserList();
};

io.on('connection', (socket) => {
  connectedSockets.push(socket);
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
    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
