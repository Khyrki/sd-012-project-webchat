module.exports = () => {
  const today = new Date();
  let month = today.getMonth() + 1;

  let minutes = today.getMinutes();

  if (minutes < 10) minutes = `0${minutes}`;
  if (month < 10) month = `0${month}`;
  const date = `${today.getDate()}-${month}-${today.getFullYear()}`;
  const time = `${today.getHours()}:${minutes}:${today.getSeconds()}`;
  
  return `${date} ${time}`;
};
