require('dotenv/config');

const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const convertDate = (string) => {
  if (parseInt(string, 10) < 10) return `0${string}`;
  return string;
};

let users = [];

const formattedDate = () => {
  const date = new Date();
  const day = convertDate(date.getDate());
  const month = convertDate(date.getMonth());
  const year = date.getFullYear();
  const hour = convertDate(date.getHours());
  const minutes = convertDate(date.getMinutes());
  const seconds = convertDate(date.getSeconds());
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  users.push({
    id: socket.id, nickname: undefined,
  });
  io.emit('users', users);
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${formattedDate()} - ${nickname} : ${chatMessage}`);
  });
  socket.on('changeNickname', (nickname) => {
    users = users.map((user) => {
      if (user.id === socket.id) return { ...user, nickname };
      return user;
    });
    io.emit('users', users);
  });
  socket.on('disconnect', () => {
    users = users.filter(({ id }) => id !== socket.id);
    io.emit('users', users);
  });
});

app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (_req, res) => res.render('webchat'));
http.listen(PORT, () => console.log(`App ouvindo na porta ${PORT}`));