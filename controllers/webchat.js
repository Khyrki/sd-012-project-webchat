const getAll = require('../models');

module.exports = async (_req, res) => {
  try {
    const messages = await getAll('messages');

    const formatedMessages = messages.map(({ message, nickname, timestamp }) =>
      `${timestamp} - ${nickname} ${message}`);

    return res.render('webchat', { formatedMessages });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};