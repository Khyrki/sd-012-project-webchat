const connection = require('./connection');

// Req. 3 - Salva a mensagem recebida no banco de dados
const createMessage = async (nickname, chatMessage, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, message: chatMessage, timestamp });
};

 // Req. 3 - Recupera todas as mensagens armazenadas no banco de dados
const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  createMessage,
  getAllMessages,
};