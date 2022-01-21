const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

dotenv.config();
const { PORT } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.resolve(__dirname, './public/')));

require('./src/sockets/messages')(io);
require('./src/sockets/users')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(PORT || 3000, () => {
  console.log(`Server listening on port ${PORT || 3000}`);
});
