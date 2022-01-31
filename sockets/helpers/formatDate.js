module.exports = (date) => {
  const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();
      const hour = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }
  if (minutes.length < 2) { minutes = `0${minutes}`; }
  if (seconds.length < 2) { seconds = `0${seconds}`; }

  return `${[year, month, day].join('-')} ${hour}:${minutes}:${seconds}`;
};