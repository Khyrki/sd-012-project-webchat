const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');
const { controllerNewMessageUser } = require('./back-end/controller/controllerMessageUser');

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/front-end/index.html`);
});

io.on('connection', (socket) => {
    socket.on('message', async (userMessage) => {
      const messageUserReturt = await controllerNewMessageUser(userMessage);
      io.emit('message', messageUserReturt);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});