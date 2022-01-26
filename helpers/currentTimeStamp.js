module.exports = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const seconds = now.getSeconds();

  return `${day}-${month}-${year} ${hour}:${minute}:${seconds}`;
};
