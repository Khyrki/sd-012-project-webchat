const standardValue = (date, equalizer) => {
  const newValue = date + equalizer >= 10 ? date + equalizer : `0${date + equalizer}`;
  return newValue;
};

const gettingDateAndTime = () => {
  const now = new Date();
  const day = standardValue(now.getDate(), 0);
  const month = standardValue(now.getMonth(), 1);
  const year = now.getFullYear();
  const hour = standardValue(now.getHours(), 0);
  const minutes = standardValue(now.getMinutes(), 0);
  const seconds = standardValue(now.getSeconds(), 0);
  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
};

module.exports = {
  gettingDateAndTime,
};