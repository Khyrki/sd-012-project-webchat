const path = require('path');
const historyModel = require('../models/history');

const webChat = async (req, res) => {
    const history = await historyModel.getAllMessages();
    console.log(history);
    res.status(200).render(path.resolve(__dirname, '../views/webChat/index.ejs'), { history });
};

module.exports = {
    webChat,
};