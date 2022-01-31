const moment = require('moment');

const formatMsg = (text, username) => ({
  username,
  text,
  time: moment().format('DD-MM-yyyy hh:mm:ss'),
});

module.exports = { 
  formatMsg,
};