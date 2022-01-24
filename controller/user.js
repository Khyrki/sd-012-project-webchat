const Message = require('../models/message');

module.exports = async (_req, res) => {
  const messages = await Message.listMessages();

  return res.render('index', { messages });
}; 