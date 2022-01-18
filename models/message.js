module.exports = (chatMessage, nickname) => {
  const date = new Date();
  const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formatTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${formatDate} ${formatTime} - ${nickname}: ${chatMessage}`;
};