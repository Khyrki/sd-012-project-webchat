const { findAllMessages } = require('../models/messages');

const users = [];
const socketsUsers = {};

const storedMessages = async () => {
  const message = await findAllMessages();

  return message.map((object) => `${object.timestamp
  } - ${object.nickname}: ${object.message}`);
};

const changeNickname = (socket, originalNickname, nickname) => {
  socketsUsers[socket.id] = nickname;

  const index = users.indexOf(originalNickname);
  users[index] = nickname;

  return users;
};

const createUser = (socket, originalNickname) => {
  socketsUsers[socket.id] = originalNickname;

  users.push(originalNickname);

  return users;
};

const excludeUser = (socket) => {
  const nickname = socketsUsers[socket.id];

  const index = users.indexOf(nickname);
  users.splice(index, 1);

  return users;
};

const findAllUsers = () => users;

module.exports = {
  changeNickname,
  createUser,
  findAllUsers,
  storedMessages,
  excludeUser,
}; 