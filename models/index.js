const Joi = require('joi');
const connection = require('./connection');

let users = [];

const getUsers = (user) => {
  users.push(user);
  return users;
};

const changeNickname = (id, nickname) => {
  users = users.map((user) => {
    if (user.id === id) return { ...user, nickname };
    return user;
  });
  return users;
};

const removeFromUsersArray = (Userid) => {
  users = users.filter(({ id }) => id !== Userid);
  return users;
};

const createMessage = async (message) => {
  const validation = Joi.object({
    message: Joi.string().required(),
    nickname: Joi.string().required(),
    timestamp: Joi.string().required(),
  }).validate(message);
  if (validation.error) throw new Error(validation);
  await connection()
  .then((db) => db.collection('messages').insertOne(message));
};

const getMessages = async () => {
  const messages = await connection()
  .then((db) => db.collection('messages').find({}));
  return messages.toArray();
};

module.exports = {
  createMessage,
  getMessages,
  getUsers,
  changeNickname,
  removeFromUsersArray,
};