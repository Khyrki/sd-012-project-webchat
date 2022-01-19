const { getMessages } = require('../models');

const webchat = async (req, res) => {
  const allMessages = await getMessages();
  res.status(200).render('index', { allMessages });
};

module.exports = webchat;