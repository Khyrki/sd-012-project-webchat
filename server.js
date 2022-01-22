const express = require('express');

const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');

app.set('views', './views');

const getAllMessages = require('./controllers/getMessages');

app.get('/', getAllMessages);

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
