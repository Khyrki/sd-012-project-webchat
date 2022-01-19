module.exports = () => {
  const today = new Date();
  const month = today.getMonth() + 1;

  const date = `${today.getDate()}-${month}-${today.getFullYear()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  
  return `${date} ${time}`;
};
