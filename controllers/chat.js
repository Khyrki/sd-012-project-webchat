const { createMessage, findAll } = require('../models/chat');

const findAllMessages = async (_req, res) => {
  const allMessages = await findAll();
  res.status(200).render('chat', { allMessages });
};

const newMessage = async ({ timeStamp, nickname, chatMessage }) => {
  const createdMessage = await createMessage({ timeStamp, nickname, chatMessage });
  return createdMessage;
};

module.exports = { findAllMessages, newMessage };