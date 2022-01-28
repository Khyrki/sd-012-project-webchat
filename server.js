const express = require('express');

const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  } });

const chatModel = require('./models/modelChat');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const PORT = 3000;

let users = [];

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('updateNickname', (nickname) => {
    console.log({ nickname });
    users = users.filter((usr) => usr.id !== socket.id); 
    users.push({ nickname, id: socket.id });
    io.emit('online', users);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    users = users.filter((usr) => usr.id !== socket.id); 
    io.emit('online', users);
  });
});

  io.on('connection', async (socket) => {
    const messages = await chatModel.getHistory();
    socket.emit('history', messages);
    socket.on('message', ({ chatMessage, nickname }) => {
      const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
      chatModel.historySave({ message: chatMessage, nickname, timestamp });
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  });

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`)); 