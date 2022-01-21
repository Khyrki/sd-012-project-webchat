const { getAll, create } = require('../models/chat ');
const dateFormat = require('../helpers/dateFormat');

const chat = (req, res) => res.render('chat');

const loadMessages = async () => {
  const allMessages = await getAll();

  if (!allMessages) return false;

  return allMessages;
};

const saveMessage = async (messageInfo) => {
  try {
    const { timestamp, chatMessage: message, nickname } = messageInfo;
    const createdMessage = await create({ timestamp, message, nickname });
  
    if (!createdMessage) throw new Error(`Message "${message}" not saved`);

    return false;
  } catch (err) {
    console.log(err);
  }
};

const formatMessage = (message) => {
  const { chatMessage, nickname } = message;
  const timestamp = dateFormat(`${new Date()}`);
  saveMessage({ timestamp, chatMessage, nickname });
  return `${timestamp} - ${nickname}: ${chatMessage}`;
};

module.exports = {
  chat,
  loadMessages,
  saveMessage,
  formatMessage,
};