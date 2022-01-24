const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const connection = require('./models/connection');

let onlineUsers = [];

const userChange = (newNick, socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.user !== socketId);
  onlineUsers.push({ nickname: newNick, user: socketId });
  io.emit('user-change', newNick, socketId);
};

app.use('/', async (req, res) => {
  try {
    const messages = await connection().then((db) => db
    .collection('messages')
    .find()
    .toArray());

    res.status(200).render('index.ejs', { messages, onlineUsers });
  } catch (err) {
    console.log('ERROR: ', err.message);
  }
});

io.on('connection', (socket) => {
  onlineUsers.push({ nickname: socket.id.slice(0, 16), user: socket.id });
  io.emit('user-In', socket.id);

  socket.on('user-change', (newNick) => {
    userChange(newNick, socket.id);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const time = moment().format('DD-MM-YYYY HH:MM:SS A');
    const msg = `${time} - ${nickname}: ${chatMessage}`;
    console.log(msg);
    connection().then((db) => db.collection('messages')
      .insertOne({ message: chatMessage, nickname, timestamp: time }));
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.user !== socket.id);
    io.emit('user-Out', socket.id);
  });
});

http.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
