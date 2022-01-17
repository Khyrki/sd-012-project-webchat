const messageModel = require('../../models/message');

module.exports = async (req, res, _next) => {
  const { message, nickname, timestamp } = req.body;

  const created = await messageModel.create(message, nickname, timestamp);

  return res.status(201).json(created);
};
