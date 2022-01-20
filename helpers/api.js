const axios = require('axios');

const URL = 'http://localhost:3000/chat';

const saveMsgs = async ({ message, nickname, timestamp }) => {
  try {
    const saveMsg = await axios.post(URL, {
      message,
      nickname,
      timestamp,
    });

    return saveMsg;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  saveMsgs,
};