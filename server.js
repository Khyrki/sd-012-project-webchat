require('dotenv').config();

const http = require('http');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(`${__dirname}/views`));

app.set('view engine', 'ejs');

app.set('views', './views');

const chatController = require('./controllers/chat');
const { formatMsg } = require('./views/js/formatMsg');
const { newUser, removeUser, changeName, allUsers } = require('./views/js/userService');

app.get('/', chatController.getAll);

io.on('connection', (socket) => {
  // On connect
  socket.emit('newUser', newUser(socket.id, socket.id.slice(0, 16)));
  io.emit('allUsers', allUsers());

  socket.on('message', ({ chatMessage, nickname }) => {
    chatController.createMsg(formatMsg(chatMessage, nickname));
    io.emit('message', formatMsg(chatMessage, nickname));
  });

  socket.on('changeName', (newName) => {
    io.emit('newName', changeName({ name: newName, id: socket.id }));
    io.emit('allUsers', allUsers());
  });

  socket.on('disconnect', () => {
    io.emit('userExit', removeUser(socket.id));
    io.emit('allUsers', allUsers());
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
