const ChatModel = require('../models/chatModel');

const INTERNAL_SERVER_ERROR = 500;

const getAllMessages = async (_req, res) => {
  const messages = await ChatModel.getAllMessages();
  try {
    // render renderiza o template
    return res.render('webchat', { messages });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).send('error:', err);
  }
};

module.exports = {
  getAllMessages,
};