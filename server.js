const faker = require('faker');
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { Users, Messages } = require('./models');

function generateNickname() {
  let nickname;
  const { firstName, lastName } = faker.name;

  do {
    nickname = `${firstName()}-${lastName()}`;
  } while (!/^[\w'-]{16}$/.test(nickname));

  return nickname;
}

function onConnect(socket) {
  const { id } = socket;
  const nickname = generateNickname();

  socket.broadcast.emit('insertUser', nickname);

  Users.create({ _id: id, nickname }).then(() => {
    console.log(`[ ${id} ] ${nickname} Connected`);
    socket.emit('connected', nickname);
  });
}

function getCurrentDate() {
  // 2012-11-04T14:51:06.157Z
  const date = new Date().toISOString();

  const reg = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).\d+Z/;
  const sub = '$3/$2/$1 $4:$5:$6';

  // 01/11/2012 14:51:06
  return date.replace(reg, sub);
}

function formatMessage(nickname, message) {
  return `${getCurrentDate()} - ${nickname}: ${message}`;
}

function onMessage(socket, { nickname, chatMessage }) {
  const formatted = formatMessage(nickname, chatMessage);
  socket.broadcast.emit('insertMessage', formatted);
  Messages.create({ chatMessage: formatted }).then(() => {
    console.log(`${nickname}: ${chatMessage}`);
  });
}

io.on('connection', (socket) => {
  onConnect(socket);

  socket.on('message', (data) => onMessage(socket, data));
  socket.on('changeUser', (nickname) => {
    Users.update(socket.id, { nickname }).then((old) => {
      console.log(`${old.nickname} para ${nickname}`);
    });

    socket.broadcast.emit('changeAnotherUser', nickname);
  });

  socket.on('disconnect', () => {
    Users.delete(socket.id).then(({ nickname }) => {
      socket.broadcast.emit('disconnected', nickname);
    });
  });
});

app.use('/views', express.static(`${__dirname}/views`));
app.set('view engine', 'ejs');

app.get('/', async (_req, res) => {
  const users = await Users.list();
  const messages = await Messages.list();

  res.render('index', {
    users,
    messages,
  });
});

http.listen(3000, () => {
  console.log('Ativo em http://localhost:3000');
});
