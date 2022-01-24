const faker = require('faker');
const userModel = require('../models/userModel');
const messageModel = require('../models/messageModel');

function generateName() {
  let fullName;
  while (!/^[\w'-]{16}$/.test(fullName)) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    fullName = `${firstName} ${lastName}`
      .replace(' ', '-');
  }
  return fullName;
}

function client(socket) {
  const fullName = generateName();
  socket.broadcast.emit('newUser', fullName);
  socket.emit('newUser', fullName);

  socket.on('user', async (nickname) => {
    socket.broadcast.emit('newUser', nickname);
    socket.emit('newUser', nickname);
    // await userModel.create(socket.id, nickname);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
