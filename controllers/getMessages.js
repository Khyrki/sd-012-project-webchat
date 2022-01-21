const getMessagesModel = require('../models/getMessages');

module.exports = async () => {
  try {
    const messageHistory = await getMessagesModel();
    console.log(messageHistory);
    return messageHistory;
  } catch (err) {
    console.log(err);
  }
};