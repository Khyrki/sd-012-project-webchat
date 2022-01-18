const express = require('express');
const moment = require('moment');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const http = require('http').createServer(app);

// setup socket
const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const { getAllMessages } = require('./controllers/chatController');
const { insertMessage } = require('./models/chatModel');

const usuarios = [];

const registerUser = (soc, data, initialId) => {
  if (!data) {
    usuarios.push({ userName: initialId, clientId: soc.id });
    soc.emit('usuarios', usuarios);
    soc.broadcast.emit('newUser', { userName: initialId, clientId: soc.id });
  } else {
    soc.emit('usuarios', usuarios);
  }
};

const messageGen = (data) => {
  const { chatMessage, nickname } = data;
  const now = new Date();
  const dateStringWithTime = moment(now).format('DD-MM-yyyy HH:mm:ss A');
  const newMessage = `${dateStringWithTime} - ${nickname}: ${chatMessage}`;
  insertMessage({ timestamp: dateStringWithTime, nickname, message: chatMessage });
  return newMessage;
};

// socket cria um ID 
io.on('connection', (socket) => {
  // emitir a mensagem
  socket.emit('connection', socket.id.substring(0, 16));
  // escutar o 'param'
  socket.on('registeredUser', ({ data }) => {
    registerUser(socket, data, socket.id.substring(0, 16));
  });

  socket.on('changeName', (data) => {
    const index = usuarios.findIndex((user) => user.userName === data.oldName);
    usuarios[index] = { userName: data.newName, clientId: usuarios[index].clientId };
    io.emit('changeName', data);
  });

  socket.on('message', (data) => {
    const newMessage = messageGen(data);
    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    io.emit('disconnected', socket.id);
    const myIndex = usuarios.findIndex((user) => user.clientId === socket.id);
    usuarios.splice(myIndex, 1);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', getAllMessages);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});