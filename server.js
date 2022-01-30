const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chat = require('./sockets/chat');

chat(io);

const controller = require('./controllers/controller');

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', controller.start);

http.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});