const { getMsgHistory } = require('../models');

const getMsgs = async (req, res, _next) => {
  try {
    const messages = await getMsgHistory();
    return res.render('chat', { messages });
  } catch (err) {
    console.error(err);
  }
};

module.exports = getMsgs; 