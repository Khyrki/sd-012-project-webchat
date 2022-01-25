const getMessagesModel = require('../models/getMessages');

module.exports = async () => {
  try {
    const messageHistory = await getMessagesModel();
    return messageHistory;
  } catch (err) {
    console.log(err);
  }
};