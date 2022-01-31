const { format } = require('date-fns');

// function generateRandomNickname() {
//   let randomString = '';
//   const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let index = 0; index < 16; index += 1) {
//     randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
//   }
//   return randomString;
// }

function adjustNicknameSize({ nickname }) {
  const newNickname = nickname.slice(0, 16);
  return newNickname;
}

function defineData() {
  const formattedDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  return formattedDate;
}

module.exports = {
  // generateRandomNickname,
  adjustNicknameSize,
  defineData,
};
