const statusCode = require('http-status-codes').StatusCodes;

const { newMessageModel, getAllModel } = require('../models/chat');

const newMessage = async ({ nickname, chatMessage, timestamp }) => {
  const message = { nickname, chatMessage, timestamp };

  await newMessageModel(message);
};

const getAll = async () => getAllModel();

const chatIDE = (_req, res) => {
  res.status(statusCode.OK).render(`${__dirname}/index.html`);
};

module.exports = {
  chatIDE,
  newMessage,
  getAll,
};