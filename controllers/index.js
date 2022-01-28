const webChatModels = require('../models');

const renderWebChat = (_req, res) => {
  res.render('webchat');
};

const createMessage = async (message) => {
  try {
    return await webChatModels.createMessage(message);
  } catch (e) {
    console.log(e);
  }
};

const convertDate = (string) => {
  if (parseInt(string, 10) < 10) return `0${string}`;
  return string;
};

const formattedDate = () => {
  const date = new Date();
  const day = convertDate(date.getDate());
  const month = convertDate(date.getMonth());
  const year = date.getFullYear();
  const hour = convertDate(date.getHours());
  const minutes = convertDate(date.getMinutes());
  const seconds = convertDate(date.getSeconds());
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

const sendMessage = async (nickname, chatMessage) => {
  const message = { message: chatMessage, nickname, timestamp: formattedDate() };
  await createMessage(message);
  return `${message.timestamp} - ${nickname} : ${chatMessage}`;
};

const getUsers = (user) => webChatModels.getUsers(user);

const getMessages = async () => {
  try {
    return await webChatModels.getMessages();
  } catch (e) {
    console.log(e);
  }
};

const changeNickname = (id, nickname) => webChatModels.changeNickname(id, nickname);

const removeFromUsersArray = (id) => webChatModels.removeFromUsersArray(id);

module.exports = {
  renderWebChat,
  getMessages,
  createMessage,
  getUsers,
  changeNickname,
  removeFromUsersArray,
  sendMessage,
};