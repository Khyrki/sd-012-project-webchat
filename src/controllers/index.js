const { getAllMessages } = require('../models');

module.exports.listAllMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    return res.render('chat', { messages });
  } catch (error) {
    console.log(error);
  }
};