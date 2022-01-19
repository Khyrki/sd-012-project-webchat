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

const emitMessageToAll = ({ nickname, chatMessage }) => {
  const fullDate = getFullDate();

  const message = `${fullDate} - ${nickname}: ${chatMessage}`;

  connectedClients.forEach((client) => {
    client.emit('message', message);
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

io.on('connection', (socket) => {
  connectedClients.push(socket);

  socket.on('message', (data) => {
    saveMessageToHistory(data);

    emitMessageToAll(data);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
