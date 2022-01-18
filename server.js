const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');
const modelMessage = require('./models/message');
const { geraStringAleatoria } = require('./helpers/helper');

const io = socketIo(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

app.use(cors());

const list = [];

io.on('connection', (socket) => {
  socket.on('newUser', (nickname) => {
    list.push({ id: socket.id, nickname });
    // console.log(list);
    io.emit('newUser', list);
  });

  socket.on('message', ({ chatMessage, nickname = geraStringAleatoria(16) }) => {
    const messageFormat = modelMessage(chatMessage, nickname);
    io.emit('message', messageFormat);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => console.log('Ouvindo a porta 3000'));