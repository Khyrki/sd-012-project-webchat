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
  const day = time.getDay();
  const month = time.getMonth();
  const year = time.getFullYear();
  return `${day}-${month}-${year} ${time.toLocaleTimeString('en-US')}`;
};

const onConnect = (socket) => ({ name }) => {
  const index = connectedInChat.findIndex((user) => user.id === socket.id);
  if (index === -1) {
    connectedInChat.push({ id: socket.id, name });
  } else {
    connectedInChat[index] = { id: socket.id, name };
  }
  io.emit('updateConnectedUsers', connectedInChat);
};

io.on('connection', (socket) => {
  socket.on('connectUser', onConnect(socket));

  socket.on('message', ({ chatMessage, name }) => {
    const date = getDate();
    Message.create({ date, name, chatMessage });
    io.emit('message', `${date} ${name} ${chatMessage}`);
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
    .map(({ date, name, chatMessage }) => `${date} ${name} ${chatMessage}`);
    return res.status(200).render('index', { messages: formattedMessages, connectedInChat });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
