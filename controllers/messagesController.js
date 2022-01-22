const messageModel = require('../models/messagesModel')
const stringRandom = require('../helpers/stringGenerator');

const STATUS_OK = 200;

const getAllMessages = async (req, res) => {
  try {
    const messages = await messageModel.getAll();

    return res.status(STATUS_OK).render('chat', { messages, nickname: stringRandom(16) });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getAllMessages,
};