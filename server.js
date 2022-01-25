require('dotenv/config');

const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const convertMonth = (string) => {
  if (parseInt(string, 10) < 10) return `0${string}`;
  return string;
};

const formattedDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = convertMonth(date.getMonth());
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${formattedDate()} - ${nickname} : ${chatMessage}`);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (_req, res) => res.render('webchat'));
http.listen(PORT, () => console.log(`App ouvindo na porta ${PORT}`));