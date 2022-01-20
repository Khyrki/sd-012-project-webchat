module.exports = () => {
  const date = new Date();
  const formDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${formDate} ${formTime}`;
}; 