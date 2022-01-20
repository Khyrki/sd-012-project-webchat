const socket = require('socket.io');

const { getAll, create } = require('../models/chat ');

const chat = (req, res) => res.render('chat');

const loadMessages = async () => {
  const allMessages = await getAll();

  if (!allMessages) return false;

  return allMessages.forEach((message) => {
    socket.emit('loadMessages', message);
  });
};

const saveMessage = async (messageInfo) => {
  try {
    const createdRecipe = await create(messageInfo);
  
    if (!createdRecipe) throw new Error(`Message ${messageInfo} not saved`);

    return false;
  } catch (err) {
    console.log(err);
  }
};

// socket.on('messageUpload', (messagesInfo) => saveMessage(messagesInfo));

module.exports = {
  chat,
  loadMessages,
  saveMessage,
};