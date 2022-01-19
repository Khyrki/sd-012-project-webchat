const statusCode = require('http-status-codes').StatusCodes;

const error = async (_err, _req, res, _next) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).end();
};

module.exports = (app) => {
  app.use(error);
};