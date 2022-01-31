const {
  getAllMsgs,
  modelCreateMsg,
} = require('../models/chat');

const getAll = async (_req, res) => {
  const allMsg = await getAllMsgs();
  res.status(200).render('../views/index', { allMsg });
};

const createMsg = async (message) => {
  const { code } = await modelCreateMsg(message);
  if (code) return true;
};

module.exports = {
  getAll,
  createMsg,
};