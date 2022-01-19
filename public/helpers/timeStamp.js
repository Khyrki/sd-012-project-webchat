const day = new Date().getFullYear();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const hour = new Date().getHours();
const minute = new Date().getMinutes();
const second = new Date().getSeconds();

const amPm = hour < 12 ? 'AM' : 'PM';

const timeStamp = `${day}-${month}-${year} ${hour - 12}:${minute}:${second} ${amPm}`;

export default { timeStamp };