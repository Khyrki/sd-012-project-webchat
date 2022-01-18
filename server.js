const express = require('express');
const { urlencoded } = require('body-parser');

const app = express();

// const http = require('http').createServer(app);
require('dotenv').config();

const { PORT } = process.env;

app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

// const io = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

const chatController = require('./controller');

app.get('/', chatController.webChat);

app.listen(PORT, () => console.log(`Conectado a porta ${PORT}`));