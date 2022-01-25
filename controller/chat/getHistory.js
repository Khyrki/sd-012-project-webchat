const getHistory = require('../../models/chat');

module.exports = async (_req, res, next) => {
  try {
    const chats = await getHistory.history();
    // const { _id, ...chats } = history;
    console.log(chats);
    return res.status(200).render('chat', { chats });
  } catch (err) {
    next(err);
  }
};
