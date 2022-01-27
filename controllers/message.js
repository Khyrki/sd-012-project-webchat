const MessageModel = require('../models/message');

const getAll = async (_req, res) => {
  const messages = await MessageModel.getAllMessages();
  return res.status(200).render('index', { messages });
};

module.exports = {
  getAll,
};
