const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, '/public')));

require('./server')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
