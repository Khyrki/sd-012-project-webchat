const transformDate = (date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1; // getMonth() is zero based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const transformTime = (date) => {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${hour}:${minute}:${second}`;
};

const handleDate = (date) => {
  const treatedDate = transformDate(date);
  const treatedTime = transformTime(date);
  return `${treatedDate} ${treatedTime}`;
};

module.exports = handleDate;