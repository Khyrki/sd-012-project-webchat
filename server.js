const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const root = require('./controllers/routers/root');

app.use(cors());
app.use(express.static(`${__dirname}/views`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./sockets')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(root);

server.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
