const getMessages = require('../models/webchatModel');

const getAllMessages = async (_req, res) => {
  try {
    const messages = await getMessages();
    return res.status(200).json(messages);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMessages,
};
