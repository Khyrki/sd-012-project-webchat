require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const path = require('path');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const { renderChat } = require('./controllers/chatController');

app.use(cors());

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', renderChat);

http.listen(PORT, () => {
  console.log(`httpServer is listening on port ${PORT}`);
});