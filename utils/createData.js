// Date catch reference: https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222

const evenNumberFormat = (number) => (number < 10 ? `0${number}` : number);
const evenMonthFormat = (month) => (month < 10 ? `0${month + 1}` : month + 1);
const converTo12Hours = (hour) => {
  const converter = hour > 12 ? hour % 12 : hour;
  return evenNumberFormat(converter);
};
const turnDateHours = (hour) => (hour > 12 ? 'PM' : 'AM');

const hours = (hour, minutes, seconds) => {
  const convertToHours = converTo12Hours(hour);
  const minutesFormat = evenNumberFormat(minutes);
  const secondsFormat = evenNumberFormat(seconds);
  const turnAmPm = turnDateHours(hour);
  return `${convertToHours}:${minutesFormat}:${secondsFormat} ${turnAmPm}`;
};

const date = (day, month, year) => {
  const stringDay = evenNumberFormat(day);
  const stringMonth = evenMonthFormat(month); 
  const stringYear = String(year);
  return `${stringDay}-${stringMonth}-${stringYear}`;
};

module.exports = (newDate) => {
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  const returnDate = date(day, month, year);
  const returnHour = hours(hour, minutes, seconds);
  const responseDate = `${returnDate} ${returnHour}`;
  return responseDate;
};
