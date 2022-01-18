const express = require('express');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

const { PORT = 3001 } = process.env;

const io = new Server(http, { cors: { origin: 'http://localhost:3000', methods: ['GET'] } });

io.listen(PORT, console.log(`Listening on port ${PORT}`));