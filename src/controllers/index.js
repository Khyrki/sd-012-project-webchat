const { getAll, create } = require('../models/chat ');

const chat = (req, res) => res.render('chat');

const loadMessages = async () => {
  const allMessages = await getAll();

  if (!allMessages) return false;

  return allMessages;
};

const saveMessage = async (messageInfo) => {
  try {
    const { message, nickname, timestamp } = messageInfo;
    const createdMessage = await create({ timestamp, message, nickname });
  
    if (!createdMessage) throw new Error(`Message ${messageInfo} not saved`);

    return false;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  chat,
  loadMessages,
  saveMessage,
};