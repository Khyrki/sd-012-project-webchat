module.exports = () => {
  const string = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  for (let i = 16; i > 0; i -= 1) {
    string.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return string.join('');
};
