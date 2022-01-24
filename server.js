const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

const PORT = 3000;

let userList = [];
let messageList = [];

const generateDate = () => {
  const d = new Date();
  // formatação de data encontrada em https://www.codegrepper.com/code-examples/javascript/Javascript+date+format+dd%2Fmm%2Fyyyy+hh%3Amm%3Ass+am%2FPM
  const dformat = `${[d.getDate(), d.getMonth() + 1, d.getFullYear()].join('-')}
    ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}`;
  return dformat;
};

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});
const { getMessages, postMessage } = require('./controllers/messages');

const renderMessages = async () => {
  const messageArray = await getMessages();
  messageList = messageArray.map((message) => 
  `${message.timestamp} - ${message.nickname}: ${message.message}`);
};

const onLogin = (socket) => {
  socket.on('login', (name) => {
    userList.push({ name, id: socket.id });
    io.emit('serverLogin', name);
  });
};

const onUserLogin = (socket, socketIo) => {
  socket.on('userLogin', (userName) => {
    const userFound = userList.find((user) => user.id === socket.id);
    if (userFound) {
      const { name } = userFound;
      userList = userList.map((user) => {
        if (user.id === socket.id) {
          return { ...user, name: userName };
        }
        return user;
      });
      socketIo.emit('updateLogin', { name, userName });
    }
  });
};

const onMessage = (socket, socketIo) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const date = generateDate();
    postMessage({ message: chatMessage, nickname, timestamp: date });
    socketIo.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
};

const onDisconnect = (socket, socketIo) => {
  socket.on('disconnect', () => {
    console.log(`${socket.id} foi desconectado!`);
    const index = userList.findIndex((user) => user.id === socket.id);
    const userFound = userList.find((user) => user.id === socket.id);
    userList.splice(index, 1);
    if (userFound) {
      socketIo.emit('removeUser', userFound.name);
    }
  });
};

io.on('connection', async (socket) => {
  console.log(`Uma nova conexão com ${socket.id} foi estabelecida!`);

  onLogin(socket);
  onUserLogin(socket, io);
  onMessage(socket, io);
  onDisconnect(socket, io);
});

app.get('/', async (_req, res) => {
  await renderMessages();
  res.render('index', { userList, messageList });
});

socketIoServer.listen(
  PORT, console.log(`Socket.io Server listening on port ${PORT}!`),
);