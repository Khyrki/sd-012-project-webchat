const { getMessages } = require('../models/chat');

// const viewPath = `${__dirname}/view/chat/index.ejs`; 

module.exports = async (req, res) => {
  const messages = await getMessages();
  res.status(200).render('index', { messages });
};