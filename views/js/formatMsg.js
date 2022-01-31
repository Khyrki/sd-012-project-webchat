const moment = require('moment');

const formatMsg = (text, username) => {
  const time = moment().format('DD-MM-yyyy hh:mm:ss');
  return `${username} - ${time} - ${text}`;
};

module.exports = { 
  formatMsg,
};