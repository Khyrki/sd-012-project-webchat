const dateModel = (chatMessage, nickname) => {
  const date = new Date();
  const DDMMYYYY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const HHMMSS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${DDMMYYYY} ${HHMMSS} - ${nickname}: ${chatMessage}`;
};

const timeStamp = () => {
  const date = new Date();
  const DDMMYYYY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const HHMMSS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${DDMMYYYY} ${HHMMSS}`;
};

module.exports = {
  dateModel,
  timeStamp,
};