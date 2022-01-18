const getAll = require('../models/getAllMessages.js');

const getAllMessages = async (_req, res) => {
  const messages = await getAll();

  res.status(200).render('chat', messages);
};

module.exports = getAllMessages;