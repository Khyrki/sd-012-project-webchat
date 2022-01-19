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

const connectedClients = [];
let connectedNicknames = [];

const emitMessageToAll = ({ nickname, chatMessage }) => {
  const fullDate = getFullDate();

  const message = `${fullDate} - ${nickname}: ${chatMessage}`;

  connectedClients.forEach((client) => {
    client.emit('message', message);
  });
};

const updateUsers = (users) => {
  const nicknames = users.map((connected) => connected.nickname);

  connectedClients.forEach((client) => {
    client.emit('users', nicknames);
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

const removeUsers = (socket) => {
  console.log(socket.id);
  const remainingUsers = connectedNicknames.filter((connected) => connected.socketId !== socket.id);

  connectedNicknames = remainingUsers;
  updateUsers(remainingUsers);
};

io.on('connection', (socket) => {
  connectedClients.push(socket);

  socket.on('message', (data) => {
    saveMessageToHistory(data);

    emitMessageToAll(data);
  });

  socket.on('userConnected', (nickname) => {
    connectedNicknames.push({ socketId: socket.id, nickname });
    updateUsers(connectedNicknames);
  });

  socket.on('changeNickname', (newNickname) => {
    const newUsers = connectedNicknames.filter((connected) => connected.socketId !== socket.id);

    newUsers.push({ socketId: socket.id, nickname: newNickname });
    connectedNicknames = newUsers;

    updateUsers(newUsers);
  });

  socket.on('disconnect', () => removeUsers(socket));
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
