module.exports = (chatMessage, nickname) => {
  const date = new Date();
  const DDMMYYY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const HHMMSS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${DDMMYYY} ${HHMMSS} - ${nickname}: ${chatMessage}`;
};