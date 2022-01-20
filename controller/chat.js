const chat = require('../models/chat');

module.exports = (req, res) => {
const getAllMessages = chat.getAll();

  res.status(200).render('index', { getAllMessages });
};
