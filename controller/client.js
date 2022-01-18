const Message = require('../models/messages');

module.exports = async (req, res) => {
  const messages = await Message.list();

  return res.render('index', { messages });
};
