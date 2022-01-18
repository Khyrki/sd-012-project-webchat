const { OK } = require('http-status-codes').StatusCodes;

const { MESSAGES } = require('../../utils/strings');
const { searchAll } = require('../../models')(MESSAGES);

module.exports = async (_req, res, _next) => {
  const messages = await searchAll();

  const messagesWithoutId = messages.map(({ _id, ...rest }) => rest);

  return res
    .status(OK)
    .json(messagesWithoutId);
};
