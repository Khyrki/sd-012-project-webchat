const chatModel = require('../models/chatModel');

const getAllMessages = async (_req, res) => {
    const allMessages = await chatModel.getAllMessages();
    console.log(allMessages);
    return res.status(200).render('chat', { allMessages });
}

module.exports = { getAllMessages }