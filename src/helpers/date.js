const formateDate = (date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}-${month}-${date.getFullYear()}`;
};

const formateTime = (date) => {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hour}:${minute}:${second}`;
};

const formateTimestamp = (date) => {
  const formatedDate = formateDate(date);
  const formatedTime = formateTime(date);
  return `${formatedDate} ${formatedTime}`;
};

module.exports = {
  formateTimestamp,
};
