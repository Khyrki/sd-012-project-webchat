const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {},
});

const uploadMessages = require('./controllers/uploadMessages');

app.get('/', uploadMessages);

require('./sockets/webchat')(io);

http.listen(3000, () => { console.log('Running on Port 3000'); });