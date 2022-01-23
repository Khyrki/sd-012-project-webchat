// Main imports
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const serverCode = require('./src/code/serverCode');

// Constants
const PORT = 3000;
const CORS = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['POST', 'GET'],
  },
};

// Dependent explicitations
const app = express();
const server = http.createServer(app);
const io = socketIo(server, CORS);

// Express setup
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(`${__dirname}/public`));
app.get('/', (_req, res) => res.render('index'));

// This is where the magic happens ✨
serverCode(io);

server.listen(PORT, () => console.log(`listening to port: ${PORT}`));
