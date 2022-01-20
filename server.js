const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const chatModel = require('./models/chat');

app.use(cors());
app.use(express.static(`${__dirname}/views`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views/chat');

const formatMessage = (chatMessage, nickname) => {
  const date = new Date();
  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const MM = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const YYYY = date.getFullYear();
  const HH = date.getHours();
  const mm = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const ss = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  const strMessage = `${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss} - ${nickname}: ${chatMessage}`;

  return strMessage;
};

let users = [];

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);
  let currentUser;

  socket.on('message', ({ chatMessage, nickname }) => {
    currentUser = nickname;
    io.emit('message', formatMessage(chatMessage, currentUser));
    chatModel.create({ chatMessage, nickname, full: formatMessage(chatMessage, nickname) });
  });

  socket.on('changeNickname', (nickname) => {
    users = users.filter((user) => user.id !== socket.id);
    users.push({ nickname, id: socket.id });

    io.emit('login', users);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    users = users.filter((user) => user.id !== socket.id);

    io.emit('login', users);
  });
});

app.get('/', async (_req, res, _next) => {
  const history = await chatModel.getAllMessages();

  return res.status(200).render('index', { history });
});

app.get('/all', async (req, res) => {
  const all = await chatModel.getAllMessages();
  res.status(200).json(all);
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
