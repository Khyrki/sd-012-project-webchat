const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const chat = require('./sockets/chat');
const chatController = require('./controllers/chat');

const { PORT } = process.env || 3000;

const httpServer = http.createServer(app);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', './view');

const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

chat(io);
chatController(app);

app.use(cors());

httpServer.listen(PORT, () => console.log(`App listening on port ${PORT}`));