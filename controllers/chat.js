const chatModel = require('../models/chat');

module.exports = async (_req, res) => {
  const messages = await chatModel.getAll();
  res.render('chat', { messages });
};
