const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const MessageModel = require('./models/Message');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname));

app.get('/', async (_req, res) => {
  try {
    const messages = await MessageModel.getAll();

    res.status(200).render('webchat', { messages });
  } catch (error) {
    res.status(500).send('Internal error');
  }
});

module.exports = httpServer;
