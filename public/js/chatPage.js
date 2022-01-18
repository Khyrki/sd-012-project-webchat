const socket = window.io('http://localhost:3000');
const nicknameInput = document.getElementById('nickname');

const button = document.getElementById('send');
button.addEventListener('click', (e) => {
  e.preventDefault();

  console.log('clicou');
  socket.emit('message', { chatMessage: 'funciona', nickname: 'josimar' });
});

const generateRandomName = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let name = '';

  for (let index = 0; index < 16; index += 1) {
    const randomIndex = Math.ceil(Math.random() * letters.length);
    name += letters[randomIndex];
  }
  
  nicknameInput.placeholder = name;
};

generateRandomName();