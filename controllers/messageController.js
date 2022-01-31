const messagesModel = require('../models/messagesModel');

// Req. 3 - cria as mensagens e armazena no banco de dados
const createMessage = async (nickname, message, timestamp) => {
  await messagesModel.createMessage(nickname, message, timestamp);
};

// Req. 3 - recupera todas as mensagens armazenadas no banco de dados
const getAllMessages = async () => { 
  const messages = await messagesModel.getAllMessages();
  return messages;
};

module.exports = {
  createMessage,
  getAllMessages,
};