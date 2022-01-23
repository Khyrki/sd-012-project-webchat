const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', async (req, res) => {
  res.render('index.html');
});

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const connection = require('./models/connection');

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const time = moment().format('DD-MM-YYYY HH:MM:SS A');
    const msg = `${time} - ${nickname}: ${chatMessage}`;
    console.log(msg);

    connection().then((db) => db
      .collection('webchat')
      .insertOne({
        message: chatMessage,
        nickname,
        timestamp: time,
      }));

    io.emit('message', msg);
  });
});

http.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
