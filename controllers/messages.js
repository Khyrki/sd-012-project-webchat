const Messages = require('../models/messages');

const getMessages = async () => {
  const messages = await Messages.get();
  return messages;
};

const postMessage = async (payload) => {
  await Messages.post(payload);
};

module.exports = {
  getMessages,
  postMessage,
};