const messageModel = require('../../models/message');

module.exports = async (_req, res, _next) => {
  const messages = await messageModel.getAll();
  
  return res.status(200).render('index', { messages });
};
