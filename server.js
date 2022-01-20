const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.static(`${__dirname}/view/chat`));
const http = require('http').createServer(app);
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

require('./socket/chat/index')(io);

const chatController = require('./controller/chat');

app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', chatController);

http.listen(PORT, () => console.log(`Aplicação iniciada na porta ${PORT}`));
