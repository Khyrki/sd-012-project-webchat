const getTimeNow = () => {
  const dateAndTime = new Date();
  const date = dateAndTime.toLocaleDateString('pt-BR').replaceAll('/', '-');
  const time = dateAndTime.toLocaleTimeString('en-US');
  return `${date} ${time}`;
};

const generateId = () => {
  let generatedId = Math.random().toString(36).substring(2, 10);
  generatedId = `${generatedId}${Math.random().toString(36).substring(2, 10)}`;
  return generatedId;
};

module.exports = { getTimeNow, generateId };
