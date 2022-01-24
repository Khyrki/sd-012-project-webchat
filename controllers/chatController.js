const chatModel = require('../models/chatModel');

const initializeChat = async (req, res) => {
    const messages = await chatModel.getAll();
    res.status(200).render('chat', { messages });
};

module.exports = { initializeChat };