const msgModel = require('../models/messages');

module.exports = async (_req, res) => {
    const messageHistory = await msgModel.findAll();
    res.render('../views/chat.ejs', { messageHistory });
};