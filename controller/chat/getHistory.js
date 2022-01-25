const getHistory = require('../../models/chat');

module.exports = async (_req, res, next) => {
  try {
    const history = await getHistory.history();
    const { _id, ...data } = history;
    console.log(data);
    return res.status(200).render('chat', data);
  } catch (err) {
    next(err);
  }
};
