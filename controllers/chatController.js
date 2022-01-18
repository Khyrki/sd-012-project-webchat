const { create, getAll } = require('../models/chatModel');

const allMessages = async (_req, res) => {
  try {
    const history = await getAll();
    res.status(200).render('chat', { history });
  } catch (error) {
    console.log(error);
  }
};

const saveMessage = async ({ timeStamp, nickname, chatMessage }) => {
  try {
    const save = await create({ timeStamp, nickname, chatMessage });
    return save;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allMessages, saveMessage };
