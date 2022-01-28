const express = require('express');

const app = express();
const http = require('http').createServer(app);

const moment = require('moment');
const path = require('path');
const bodyParser = require('body-parser');

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST'],
    } });

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const date = moment().format('DD-MM-yyyy HH:mm:ss A');

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${chatMessage}, ${nickname}, ${date}`);
    });
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, './public/chat.html'));
});   

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});