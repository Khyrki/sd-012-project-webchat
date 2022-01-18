const { OK } = require('http-status-codes').StatusCodes;

const { WEBCHAT } = require('../../utils/strings');
const { remove } = require('../../models')(WEBCHAT);

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  
  await remove(id);

  return res
    .status(OK)
    .end();
};
