// Boa parte dessa função de formatação foi feita com base nessa thread do
// Stackoverflow: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

module.exports = () => {
  const date = new Date(Date.now());
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  const hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }
  if (minutes.length < 2) { minutes = `0${minutes}`; }
  if (seconds.length < 2) { seconds = `0${seconds}`; }

  return `${[day, month, year].join('-')} ${hour}:${minutes}:${seconds}`;
};