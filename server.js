const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const controler = require('./controller/chat');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', controler);

require('./socket/webchat')(io);

http.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});