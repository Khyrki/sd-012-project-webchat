const getHistory = require('../../models/chat');

module.exports = async (req, res, next) => {
  try {
    const history = await getHistory.history();
    return res.status(200).render('chat', history);
  } catch (err) {
    next(err);
  }
};
