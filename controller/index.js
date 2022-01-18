const { StatusCodes } = require('http-status-codes');

const webChat = async (_req, res) => res.status(StatusCodes.OK).render('chat');

module.exports = {
  webChat,
};
