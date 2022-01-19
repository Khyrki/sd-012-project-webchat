const moment = require('moment');

function randomizeAlphabetic(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getTimeAndFormat() {
  const actualDate = new Date();
  const timeFormat = 'DD-MM-YYYY HH:MM:SS A';
  const timeStamp = moment(actualDate).format(timeFormat);
  return timeStamp;
}

function createUser() {
  const randomizedNameLength = 16;
  const nickname = randomizeAlphabetic(randomizedNameLength);
  const createdAt = getTimeAndFormat();
  const onlineUser = { nickname, createdAt };
  return onlineUser;
}

function createMessage(message, nickname) {
  const createdAt = getTimeAndFormat();
  const messageObject = { createdAt, message, nickname };
  return messageObject;
}

module.exports = {
  createMessage,
  createUser,
  getTimeAndFormat,
  randomizeAlphabetic,
};
