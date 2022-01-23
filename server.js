const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

const PORT = 3000;

const userList = [];
const messageList = [];

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

io.on('connection', (socket) => {
  console.log(`Uma nova conexão com ${socket.id} foi estabelecida!`);

  socket.on('userLogin', (user) => {
    userList.push(user);
    io.emit('serverLogin', user);
  });

  socket.on('message', ({ nickname, chatMessage }) => {
    const date = generateDate();
    const message = `${date} - ${nickname}: ${chatMessage}`;
    messageList.push(message);
    io.emit('message', message);
  });
});

app.get('/', (_req, res) => {
  res.render('index', { userList, messageList });
});

socketIoServer.listen(
  PORT, console.log(`Socket.io Server listening on port ${PORT}!`),
);