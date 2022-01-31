const { 
  getAllMsgs,
  modelCreateMsg,
  modelCreateUser,
  getAllUsers,
} = require('../models/chat');

const getAll = async (_req, res) => {
  const allMsg = await getAllMsgs();
  res.status(200).render('../views/index', { allMsg });
};
const getAllUser = async (_req, res) => {
  const allUser = await getAllUsers();
  res.status(200).render('../views/index', { allUser });
};

const createMsg = async (username, text, time) => {
  const { code } = await modelCreateMsg(username, text, time);
  if (code) return true;
};

const createUser = async ({ id, newName }) => {
  const { code } = await modelCreateUser(id, newName);
  if (code) return true;
};

module.exports = {
  getAll,
  createMsg,
  createUser,
  getAllUser,
};