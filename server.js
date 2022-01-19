const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});
const chatModel = require('./models/chat');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

const formatMessage = (chatMessage, nickname) => {
  const date = new Date();
  let DD = date.getDate();
  let MM = date.getMonth() + 1;
  const YYYY = date.getFullYear();
  const HH = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  if (DD.toString().length < 2) {
    DD = `0${DD}`;
  }

  if (MM.toString().length < 2) {
    MM = `0${MM}`;
  }

  const strMessage = `${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss} - ${nickname}: ${chatMessage}`;

  return strMessage;
};

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);
  let currentUser;

  socket.on('message', ({ chatMessage, nickname }) => {
    currentUser = nickname;
    io.emit('serverMessage', formatMessage(chatMessage, currentUser));
    chatModel.create({ chatMessage, nickname, full: formatMessage(chatMessage, nickname) });
  });

  socket.on('changeNickname', ({ nickname }) => {
    currentUser = nickname;
    io.emit('newNickname', currentUser);
  });

  socket.on('login', (nickname) => {
    io.emit('setNickname', nickname);
  });
});

app.get('/', async (req, res) => {
  const history = await chatModel.getAllMessages();

  res.render('chat/index', { history });
});

app.get('/all', async (req, res) => {
  const all = await chatModel.getAllMessages();
  res.status(200).json(all);
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
