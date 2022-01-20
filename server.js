const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const messagesSocket = require('./sockets/messages');
const usersSocket = require('./sockets/users');
const { getAllMessages } = require('./models');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', async (_req, res) => {
  const messages = await getAllMessages();

  res.status(200).render('chat', { messages });
});

messagesSocket(io);
usersSocket(io);

httpServer.listen(3000);