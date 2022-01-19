const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  },
});
const Sockets = require('./src/sockets');
app.use(express.static(path.resolve(__dirname, 'src', 'public')));

Sockets.chat(io);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'public', 'chat.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));