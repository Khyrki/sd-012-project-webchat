const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  },
});

const getMessages = require('./controllers/getMessages');

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', async (_req, res) => {
  const messageHistory = await getMessages();
  console.log(messageHistory);
  res.render('chat', { messageHistory });
});

http.listen(
  PORT, console.log(`Socket.io Server listening on port ${PORT}!`),
);