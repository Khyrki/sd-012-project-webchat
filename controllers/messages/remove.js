const { OK } = require('http-status-codes').StatusCodes;

const { MESSAGES } = require('../../utils/strings');
const { remove, searchByField } = require('../../models')(MESSAGES);

module.exports = async (req, res, _next) => {
  const { message, nickname, timestamp } = req.body;

  const { _id: id } = await searchByField({ message, nickname, timestamp });
  
  await remove(id);

  return res
    .status(OK)
    .end();
};
