const express = require('express');

const app = express();
const http = require('http').createServer(app);
// const { urlencoded } = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// app.use(urlencoded({ extended: true }));

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

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
