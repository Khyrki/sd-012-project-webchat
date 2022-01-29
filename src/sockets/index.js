const socket = require('socket.io');
require('dotenv').config();

module.exports = (http) => socket(http, {
  cors: {
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST'],
  },
});