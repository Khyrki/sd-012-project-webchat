const { OK } = require('http-status-codes').StatusCodes;

const { WEBCHAT } = require('../../utils/strings');
const { searchAll } = require('../../models')(WEBCHAT);

module.exports = async (_req, res, _next) => {
  const messages = await searchAll();

  return res
    .status(OK)
    .json(messages);
};
