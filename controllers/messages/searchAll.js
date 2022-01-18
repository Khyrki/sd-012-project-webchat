const { MESSAGES } = require('../../utils/strings');
const { searchAll } = require('../../models')(MESSAGES);

module.exports = async () => {
  const messagesAll = await searchAll();
  
  const result = messagesAll.map((msg) => {
    const { message, nickname, timestamp } = msg;
    const messageString = `${timestamp} - ${nickname}: ${message}`;
    return messageString;
  });

  return result;
};