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
const userModel = require('./models/user');

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

const removeAndUpdate = async (id) => {
  await userModel.remove(id);
    const users = await userModel.getAll();
    io.emit('login', users);
};

const formatFirst = (nickname, users, socket) => {
    socket.broadcast.emit('login', users);
    users.pop();
    users.unshift({ nickname });
    // console.log(nickname, usersFirst, users);
    socket.emit('login', users);
};

const changeNickname = async (nickname, socket) => {
    await userModel.update(socket.id, nickname);
    const users = await userModel.getAll();
    socket.broadcast.emit('changeNickname', { users, currentUser: nickname });
    users.pop();
    users.unshift({ nickname });
    console.log(users);
    socket.emit('changeNickname', { users, currentUser: nickname });
};

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);
  let currentUser;

  socket.on('message', ({ chatMessage, nickname }) => {
    currentUser = nickname;
    io.emit('message', formatMessage(chatMessage, currentUser));
    chatModel.create({ chatMessage, nickname, full: formatMessage(chatMessage, nickname) });
  });

  socket.on('changeNickname', async (nickname) => changeNickname(nickname, socket));

  socket.on('login', async ({ nickname }) => {
    await userModel.create({ nickname, _id: socket.id });
    const users = await userModel.getAll();
    formatFirst(nickname, users, socket);
  });

  socket.on('disconnect', async () => removeAndUpdate(socket.id));
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
