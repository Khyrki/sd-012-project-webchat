/**
-- Honestidade intelectual --
Nesse projeto eu acompanhei muitas monitorias e vi muitas soluções de
muitas pessoas diferentes,eu implementei algumas que vi nesse projeto, 
principalmente no socket do arquivo webchat.ejs na questão da 
lógica de como fazer o filtros (linha 70 e 80 a 85)
*/

const chatModels = require('../models/chatModels');

module.exports = async (_req, res) => {
  try {
    const uploadMessages = await chatModels.findAll();
    //* console.log(uploadMessages);
    const messages = uploadMessages.map(({ message, nickname, timestamp }) => {
      return `${timestamp} - ${nickname} ${message}`;
    }
    //* envia para página ejs webchat o objeto messages                               
    return res.render('webchat', { messages });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
