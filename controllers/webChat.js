const path = require('path');

const webChat = async (req, res) => {
    res.status(200).render(path.resolve(__dirname, '../views/webChat/index.ejs'));
};

module.exports = {
    webChat,
};