const express = require('express');

const app = express();
const http = require('http').createServer(app);

require('dotenv').config();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

  app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './views');

require('./socket')(io);

http.listen(PORT, () => console.log(`server rodando na porta ${PORT}`));