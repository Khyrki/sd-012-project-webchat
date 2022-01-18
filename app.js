const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
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
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = formatDate(new Date());
    const message = `${date} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.status(200).render('webchat');
});

module.exports = httpServer;
