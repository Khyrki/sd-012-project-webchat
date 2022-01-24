const addZero = (n) => ((n < 10) ? `0${n}` : `${n}`);

const formatTime = (currentDate) => {
  const nowDate = {
    Day: addZero(currentDate.getDate()),
    Month: addZero(currentDate.getMonth() + 1),
    Year: currentDate.getFullYear(),
    Hour: addZero(currentDate.getHours()),
    Minute: addZero(currentDate.getMinutes()),
    Second: addZero(currentDate.getSeconds()),
  };
  const ampm = nowDate.Hour >= 12 ? 'PM' : 'AM';
  nowDate.Hour %= '12';
  nowDate.Hour = nowDate.Hour ? nowDate.Hour : '12';

  const formatedDate = `${nowDate.Day}-${nowDate.Month}-${nowDate.Year}`;
  const formatedHour = `${nowDate.Hour}:${nowDate.Minute}:${nowDate.Second} ${ampm}`;

  return `${formatedDate} ${formatedHour}`;
};

const formatTimeDB = (currentDate) => {
  const nowDate = {
    Day: addZero(currentDate.getDate()),
    Month: addZero(currentDate.getMonth() + 1),
    Year: currentDate.getFullYear(),
    Hour: addZero(currentDate.getHours()),
    Minute: addZero(currentDate.getMinutes()),
    Second: addZero(currentDate.getSeconds()),
  };

  const formatedDate = `${nowDate.Year}-${nowDate.Month}-${nowDate.Day}`;
  const formatedHour = `${nowDate.Hour}:${nowDate.Minute}:${nowDate.Second}`;

  return `${formatedDate} ${formatedHour}`;
};

module.exports = {
  formatTime,
  formatTimeDB,
};