require('dotenv').config();

const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = socketIo(http, {
    cors: {
        origin: 'http:\\localhost:3000',
        method: ['GET', 'POST'],
    },
});

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_req, res) => {
    res.render('chat');
  });

http.listen(PORT, () => {
    console.log(`Ouvindo na porta ${PORT}`);    
});