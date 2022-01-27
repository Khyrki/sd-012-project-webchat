const express = require('express'); 

const app = express();
const PORT = 3000;
const http = require('http').createServer(app);
const moment = require('moment'); // https://momentjs.com/

const bodyParser = require('body-parser');

const io = require('socket.io')(http, { // https://socket.io/docs/
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const controller = require('./controllers/chat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); 

const date = moment().format('DD-MM-yyyy HH:mm:ss A');
const users = {};

io.on('connection', async (socket) => {
  // req 1 - exibindo a mensagem do jeito que o requisito pede
  socket.on('message', async (mensagem) => {
    io.emit('message', `${date} - ${mensagem.nickname}: ${mensagem.chatMessage}`);
    // req 3 - mandar a data e a mensagem para o BD
    await controller.create(date, mensagem);
  });

  socket.on('newUser', (nickname) => {
    users[socket.id] = nickname; io.emit('loadUsers', Object.values(users));
  });
  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname; io.emit('loadUsers', Object.values(users)); 
  });

  socket.on('disconnect', () => {
    delete users[socket.id]; io.emit('loadUsers', Object.values(users)); 
  });

  // req 3 - exibe todas as mensagens do BD
  const getMessages = await controller.getAll();
    getMessages.forEach((mensagem) => {
      socket.emit('messageLoad', `${date} - ${mensagem.nickname}: ${mensagem.message}`);
  });
});

http.listen(PORT, () => console.log(`Iniciando na porta ${PORT}!`));