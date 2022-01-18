const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/front-end/index.html`);
});

io.on('connection', (socket) => {
    socket.on('message', ({ nickname, chatMessage }) => {
      const now = new Date();
      const returnMessage = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} - ${nickname}: ${chatMessage}`;
      io.emit('message', returnMessage);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});