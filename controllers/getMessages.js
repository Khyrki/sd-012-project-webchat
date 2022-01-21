const { getMessagesHistory } = require('../models');

const getAllMessages = async (req, res, _next) => {
  try {
    const messages = await getMessagesHistory();
    return res.render('chat', { messages });
  } catch (err) {
    console.error(err);
  }
};

module.exports = getAllMessages;