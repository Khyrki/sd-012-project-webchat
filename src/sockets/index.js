const socket = require('socket.io');
require('dotenv').config();

module.exports = (http) => socket(http, {
  cors: {
    origin: 'http//localhost:3000',
    methods: ['GET', 'POST'],
  },
});