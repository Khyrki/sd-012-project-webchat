const chatModels = require('../models/chatModels');

module.exports = async (_req, res) => {
  try {
    const uploadMessages = await chatModels.findAll();
    // console.log(uploadMessages);
    const messages = uploadMessages.map(({ message, nickname, timestamp }) =>
      `${timestamp} - ${nickname} ${message}`);
    return res.render('webchat', { messages });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};