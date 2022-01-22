const express = require('express');
const moment = require('moment');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const users = {};

// const port = process.env.PORT || 3000;
const port = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
const { getAllMessages } = require('./models/chat.js');
const { insert } = require('./models/chat');

io.on('connection', (socket) => {
  users[socket.id] = socket.id.substring(0, 16);

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('nickname', Object.values(users));
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const message = chatMessage;

    await insert({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('nickname', Object.values(users));
  });
  io.emit('nickname', Object.values(users));
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());

app.get('/', async (_request, response) => {
  const messages = await getAllMessages();
  response.render('index', { messages });
});

http.listen(port, () => console.log(`Listening on ${port}`));