const getTimeNow = () => {
  const dateAndTime = new Date();
  const date = dateAndTime.toLocaleDateString('pt-BR').replaceAll('/', '-');
  const time = dateAndTime.toLocaleTimeString('en-US');
  return `${date} ${time}`;
};

module.exports = { getTimeNow };
