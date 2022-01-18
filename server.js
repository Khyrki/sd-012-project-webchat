// Faça seu código aqui
const express = require('express');
const dotenv = require('dotenv');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const socketio = require('socket.io');

dotenv.config();
const { PORT } = process.env;

const io = socketio(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT || 3000, () => console.log(`Listening on port ${PORT || 3000}`));