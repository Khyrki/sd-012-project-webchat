const { OK, INTERNAL_SERVER_ERROR } = require('../constants/status');
const MessageModel = require('../models/MessageModel');

const Message = new MessageModel();

const getChat = async (_req, res, _next) => {
  try {
    const messages = await Message.find();

    res.status(OK).render('chat', { messages });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).render('error', { err });
  }
};
module.exports = getChat;
