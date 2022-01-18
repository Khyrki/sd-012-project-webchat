const { CREATED } = require('http-status-codes').StatusCodes;

const { MESSAGES } = require('../../utils/strings');
const { create, searchById } = require('../../models')(MESSAGES);

module.exports = async (req, res, _next) => {
  const { message, nickname, timestamp } = req.body;

  const { insertedId } = await create({ message, nickname, timestamp });

  const { _id, ...createdWithoutId } = await searchById(insertedId);

  return res
    .status(CREATED)
    .json(createdWithoutId);
};
