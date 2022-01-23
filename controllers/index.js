const rescue = require('express-rescue');
const model = require('../models');

module.exports.getAllMessages = rescue(async (_req, res, _next) => {
  const messages = await model.getAllMessages();
  const formatMessages = messages.map(({ chatMessage, nickname, timestamp }) => (
    `${timestamp} - ${nickname}: ${chatMessage}`
  ));
  return res.status(200).render('webchat/index', { formatMessages });
});