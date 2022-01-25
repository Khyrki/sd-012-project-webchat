const express = require('express');

const app = express();
const PORT = 3000;
const http = require('http').createServer(app);
const moment = require('moment');

const bodyParser = require('body-parser');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const date = moment().format('DD-MM-yyyy HH:mm:ss A');

io.on('connection', (socket) => {
  socket.on('message', (messagem) => {
    io.emit('message', `${date} - ${messagem.nickname}: ${messagem.chatMessage}`);
  });
});

app.get('/', (_req, res) => res.send('Webchat'));

http.listen(PORT, () => console.log(`Iniciando na porta ${PORT}!`));