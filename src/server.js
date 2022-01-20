const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const RootController = require('./controllers');
const Models = require('./models');
const ServerState = require('./ServerState');
const RootSocket = require('./sockets');
const Views = require('./views');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${PORT || 3000}`,
    methods: ['GET', 'POST'],
  },
});

// state;
const serverState = new ServerState();

// views;
const views = new Views();

// models;
const models = new Models();

// sockets;
const sockets = new RootSocket(io, models.map, serverState);
sockets.execute();

// settings;
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// middlewares;
app.use(express.json());

// public files;
app.use(express.static(path.resolve(__dirname, 'public')));

// controllers;
const rootController = new RootController(app, views.map, models.map);
rootController.execute();

// server;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${3000}`);
});
