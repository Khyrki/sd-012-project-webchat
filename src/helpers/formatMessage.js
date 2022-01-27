// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}

const presentDate = new Date();
const date = `${presentDate.getDate()}-${presentDate.getMonth() + 1}-${presentDate.getFullYear()}`;

const customMessage = (chatMessage, nickName) => {
  const custom = `${date} ${formatAMPM(new Date())} - ${nickName}: ${chatMessage}`;      
  return custom;
};

module.exports = customMessage;