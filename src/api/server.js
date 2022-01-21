require('dotenv').config();

const http = require('http').createServer(require('./app'));
const io = require('socket.io')(http, {
  cors: {
    origin: 'http:localhost:3000',
  },
});

const { PORT = 3000 } = process.env;

require('../sockets')(io);

http.listen(PORT, () => {
  console.log('Server listening on port 3000');
});