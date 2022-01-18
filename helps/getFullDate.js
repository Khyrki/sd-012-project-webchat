module.exports = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const fullDate = `${day}-${month + 1}-${year} ${hour}:${min}:${sec}`;
  return fullDate;
};