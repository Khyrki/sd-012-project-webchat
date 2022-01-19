module.exports = () => {
  let name = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    name += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return name;
};