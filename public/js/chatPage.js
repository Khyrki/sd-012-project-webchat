const socket = window.io('http://localhost:3000');
const nicknameInput = document.getElementById('nickname');
const saveNicknameBtn = document.getElementById('save-nickname');
const userNicknameElem = document.getElementsByClassName('user-nickname')[0];
const userMessageElem = document.getElementById('user-message');
const chat = document.getElementsByClassName('chat')[0];

const button = document.getElementById('send');
button.addEventListener('click', (e) => {
  e.preventDefault();

  const nickname = sessionStorage.getItem('nickname');
  const chatMessage = userMessageElem.value;

  if (chatMessage !== '') {
    socket.emit('message', { chatMessage, nickname });
  }

  userMessageElem.value = '';
});

const generateRandomName = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let name = '';

  for (let index = 0; index < 16; index += 1) {
    const randomIndex = Math.ceil(Math.random() * letters.length);
    name += letters[randomIndex];
  }
  
  sessionStorage.setItem('nickname', name);
};

generateRandomName();

const nickname = sessionStorage.getItem('nickname');

userNicknameElem.innerHTML = nickname;

saveNicknameBtn.addEventListener('click', () => {
  const newNickname = nicknameInput.value;

  sessionStorage.setItem('nickname', newNickname);
  userNicknameElem.innerHTML = newNickname;
  nicknameInput.value = '';
});

const createNewMessage = (data) => {
  const newMessage = document.createElement('p');
  newMessage.innerHTML = data;
  newMessage.dataset.testid = 'message';
  
  chat.appendChild(newMessage);
};

socket.on('message', createNewMessage);
