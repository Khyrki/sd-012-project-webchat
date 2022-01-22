const moment = require('moment');

const serializeDate = (date) => {
  const serializedDate = moment(date).format('DD-MM-YYYY h:mm:ss A');
  return serializedDate;
};

const serializeMsg = (chatMessage, nickname, date) => {
  const message = `${date} - ${nickname}: ${chatMessage}`;
  return message;
};

const genRandomString = () => Array.from(Array(16),
() => Math.floor(Math.random() * 36).toString(36)).join('');

module.exports = {
  serializeMsg,
  genRandomString,
  serializeDate,
};