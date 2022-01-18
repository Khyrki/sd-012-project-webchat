const formatMessage = (chatMessage, nickname) => {
  const fullDate = new Date();
  const formatDate = `${fullDate.getDate()}-${fullDate.getMonth() + 1}-${fullDate.getFullYear()}`;
  const formatTime = `${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`;
  return `${formatDate} ${formatTime} - ${nickname}: ${chatMessage}`;
};

const removeSelectedUser = (id, list) => list.filter((item) => item.id !== id);

module.exports = {
  formatMessage,
  removeSelectedUser,
};
