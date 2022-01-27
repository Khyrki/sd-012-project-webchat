const models = require('../models/chat');

const create = async (timestamp, message) => {
  try {
    const { chatMessage, nickname } = message;
    await models.create(timestamp, nickname, chatMessage);
  } catch (err) {
    console.log(err);
  }
};

const getAll = async () => {
  try {
    const messages = await models.getAll();
    return messages;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  getAll,
};