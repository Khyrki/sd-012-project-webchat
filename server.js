const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const Message = require('./models/Message');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

const connectedInChat = [];

const getDate = () => {
  const time = new Date();
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return `${day}-${month}-${year} ${time.toLocaleTimeString('en-US')}`;
};

const onConnect = (socket) => ({ nickname }) => {
  const index = connectedInChat.findIndex((user) => user.id === socket.id);
  if (index === -1) {
    connectedInChat.push({ id: socket.id, nickname });
  } else {
    connectedInChat[index] = { id: socket.id, nickname };
  }
  io.emit('updateConnectedUsers', connectedInChat);
};

io.on('connection', (socket) => {
  socket.on('connectUser', onConnect(socket));

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getDate();
    Message.create({ date, nickname, chatMessage });
    io.emit('message', `${date} ${nickname} ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    const index = connectedInChat.findIndex((user) => user.id === socket.id);
    connectedInChat.splice(index, 1);
    io.emit('updateConnectedUsers', connectedInChat);
  });
});

app.get('/', async (req, res) => {
  const messages = await Message.getAll();
  const formattedMessages = messages
    .map(({ date, nickname, chatMessage }) => `${date} ${nickname} ${chatMessage}`);
    return res.status(200).render('index', { messages: formattedMessages, connectedInChat });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
