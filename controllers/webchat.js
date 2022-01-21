const { getMessages } = require('../models/chat');

module.exports = async (req, res) => {
  const messages = await getMessages();
  res.status(200).render('index', { messages });
};