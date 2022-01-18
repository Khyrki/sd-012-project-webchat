// Faça seu código aqui.
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatPageController = require('./controllers/chatPage');

app.use('/', chatPageController);

const connectedClients = [];

const emitMessageToAll = ({ nickname, chatMessage }) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const message = `${day}-${month + 1}-${year} ${hour}:${min}:${sec} - ${nickname}: ${chatMessage}`;

  connectedClients.forEach((client) => {
    client.emit('message', message);
  });
};

io.on('connection', (socket) => {
  connectedClients.push(socket);

  socket.on('message', (data) => {
    console.log(data);

    emitMessageToAll(data);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
