module.exports = () => {
  const today = new Date();

  const data = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const amOrPm = today.getHours() > 12 ? 'PM' : 'AM';

  const hour = `${hours}:${minutes}:${seconds} ${amOrPm}`;

  return { data, hour };
};