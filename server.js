require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const PORT = process.env.LOCALHOST;

function generateString(size) {
  let stringGenerated = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz';

  const lengthCharacters = characters.length;

  for (let i = 0; i < size; i += 1) {
    stringGenerated += characters.substr(Math.floor((Math.random() * lengthCharacters) + 1), 1);
  }

  return stringGenerated;
}

const app = express();

const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

io.on('connect', async (socket) => {
  const userNameRandom = generateString(16);

  socket.emit('username', userNameRandom);

  socket.on('message', (data) => {
    const { nickname, chatMessage } = data;
    const formatedTime = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${formatedTime} - ${nickname}: ${chatMessage}`);
  });
});

socketIoServer.listen(PORT);

console.log(`Webchat ouvindo na porta ${PORT}`);