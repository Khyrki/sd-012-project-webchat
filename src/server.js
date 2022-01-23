const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

require('./sockets/chat')(io);
const { listAllMessages } = require('./controllers');

app.get('/', listAllMessages);

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});