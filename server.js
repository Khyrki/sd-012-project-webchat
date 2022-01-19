// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
} });

const getMessagesController = require('./controllers/webchatController');
const createMessageModel = require('./models/webchatModel');

require('./sockets/webchatSocket')(io);

app.use(cors());

app.post(
  '/',
  createMessageModel.createMessage,
);

app.get(
  '/',
  getMessagesController.getAllMessages,
);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});