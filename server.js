const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString().split(',').join(' ')
      .replaceAll('/', '-');
    const message = `${date} - ${nickname} ${chatMessage}`;

    io.emit('message', message);
  });
});

app.get('/', (req, res) => {
  res.send('Hello there');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
