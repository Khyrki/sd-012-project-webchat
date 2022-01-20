const chat = require('../models/chat');

module.exports = async (req, res) => {
const getAllMessages = await chat.getAll();

  res.status(200).render('index', { getAllMessages });
};
