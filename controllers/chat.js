const Chat = require('../models/chat');

const createChat = async (_req, res) => {
  const messages = await Chat.getMessages();

  if (!messages) return res.render('index');

  res.render('index', { messages });
};

const saveMessage = async (req, res) => {
  try {
    const { message, nickname, timestamp } = req.body;
    await Chat.saveMessages({ message, nickname, timestamp });
  
    res.status(200).end();
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createChat,
  saveMessage,
};