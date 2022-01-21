const express = require('express');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const webchat = require('./controllers/webchat');

app.use(express.json());

const { PORT = 3000 } = process.env;

const io = new Server(http, { 
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'], 
  },
});

app.use(express.static(`${__dirname}/view/chat`));

app.get('/', webchat);

app.set('view engine', 'ejs');

app.set('views', './view/chat');

require('./socket/chat')(io);

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
