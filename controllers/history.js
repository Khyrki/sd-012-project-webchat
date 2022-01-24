const ModelsHistory = require('../models/history');

const getHistory = async (_request, response) => {
  try {
    const history = await ModelsHistory.getAll();
    return response.status(200).render('chat', { history });
  } catch (error) {
    console.log(error);
  }
};

const addHistory = async ({ timeStamp, nickname, chatMessage }) => {
  try {
    const historyCreated = await ModelsHistory.addHistory({ timeStamp, nickname, chatMessage });
    return historyCreated;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addHistory, getHistory };
