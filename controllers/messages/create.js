const { CREATED } = require('http-status-codes').StatusCodes;

const { WEBCHAT } = require('../../utils/strings');
const { create, searchById } = require('../../models')(WEBCHAT);

module.exports = async (req, res, _next) => {
  const { message, nickname, timestamp } = req.body;

  const { insertedId } = await create({ message, nickname, timestamp });

  const created = await searchById(insertedId);

  return res
    .status(CREATED)
    .json(created);
};
