const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const chat = require('./sockets/chat');

const { PORT } = process.env;

const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', './view');

const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3001',
    method: ['GET', 'POST'],
  },
});

chat(io);

app.use(cors());

app.get('/', (_req, res) => res.status(200).render('index'));

httpServer.listen(PORT, () => console.log(`App listening on port ${PORT}`));