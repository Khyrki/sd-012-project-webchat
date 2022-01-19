const { read } = require('../models/chat');

module.exports = async (req, res, next) => {
  try {
    const messages = await read();

    return res.status(200).render('chatPage', { messages });
  } catch (error) {
    next(error);
  }
};