module.exports = (n) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';

  for (let i = 0; i < n; i += 1) {
    string += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return string;
};

// funcao adquirida de https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
