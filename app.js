const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');

const { formatDate } = require('./utils');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const username = crypto.randomBytes(16).toString('hex').substring(0, 16);
  socket.emit('connect-user', username);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = formatDate(new Date());
    const message = `${date} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });

  socket.on('change-name', ({ newName, currentName }) => {
    io.emit('change-name', { newName, currentName });
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname));

app.get('/', (_req, res) => {
  res.status(200).render('webchat');
});

module.exports = httpServer;
