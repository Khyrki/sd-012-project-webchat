const { OK, INTERNAL_SERVER_ERROR } = require('../constants/status');

const getChat = (_req, res, _next) => {
  try {
    res.status(OK).render('chat');
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).render('error');
  }
};
module.exports = getChat;
