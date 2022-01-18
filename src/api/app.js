const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const RootSocket = require('../sockets');
const rootRouter = require('./router');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${process.env.PORT || 3000}`,
    methods: ['GET', 'POST'],
  },
});

// sockets;
const sockets = new RootSocket(io);
sockets.execute();

// settings;
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));

// middlewares;
app.use(express.json());

// router;
app.use(rootRouter);

module.exports = server;
