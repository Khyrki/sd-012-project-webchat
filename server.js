require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const webChat = require('./controllers');

require('./sockets/webchat.js')(io);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', webChat.renderWebChat);

http.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));