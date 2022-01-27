require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');

app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
  } });
  
const { findAllMessages } = require('./controllers/chat');

require('./sockets/chat')(io);

app.get('/', findAllMessages);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));