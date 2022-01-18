// Faça seu código aqui.
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatPageController = require('./controllers/chatPage');

app.use('/', chatPageController);

io.on('connection', (socket) => {
  console.log(`client connected with id: ${socket.id}`);
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
