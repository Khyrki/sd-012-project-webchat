const Messages = require('../models/Messages');

module.exports = async (req, res) => {
  const messages = await Messages.getMessages();

  res.render('index', { messages });
};
