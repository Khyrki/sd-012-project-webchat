const getFormatedDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours < 12 ? 'AM' : 'PM';

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
};

module.exports = getFormatedDate;
