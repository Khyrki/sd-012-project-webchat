const connection = require('./connection');

const saveMessageHistory = async ({ message, nickname, timestamp }) => {
  try {
    const db = await connection();
    const success = await db.collection('messages').insertOne({ message, nickname, timestamp });
    return success;
  } catch (err) {
    console.log('Erro ao salvar histórico');
    return err;
  }
};

const messageHistory = async () => {
  try {
  const db = await connection();
  const messageArray = await db.collection('messages').find().toArray();
  return messageArray;
} catch (err) {
  console.log('Erro ao consultar histórico');
  return err;
}
};

module.exports = {
  saveMessageHistory,
  messageHistory,
};
