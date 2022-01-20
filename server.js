const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  } });

const { getMessage } = require('./models/servModel');

app.use(express.static(__dirname));

app.set('view engine', 'ejs');
app.set('views', './views');

require('./sockets/chat')(io);

app.get('/', async (_req, res) => {
  const response = await getMessage();
  res.render('chat', { messages: response });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});