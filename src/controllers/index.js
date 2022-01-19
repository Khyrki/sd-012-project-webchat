const { StatusCodes } = require('http-status-codes');

const chat = async (_req, res) => res.status(StatusCodes.OK).render('chat');

module.exports = {
  chat,
};