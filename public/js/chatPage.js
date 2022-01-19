const socket = window.io('http://localhost:3000');
let socketId = '';

const nicknameInput = document.getElementById('nickname');
const saveNicknameBtn = document.getElementById('save-nickname');
const userMessageElem = document.getElementById('user-message');
const chat = document.getElementsByClassName('chat')[0];
const usersElement = document.getElementsByClassName('users')[0];

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
    const randomIndex = Math.ceil(Math.random() * (letters.length - 1));
    const letter = letters[randomIndex];
    name += letter;
  }
  
  sessionStorage.setItem('nickname', name);
};

generateRandomName();

const nickname = sessionStorage.getItem('nickname');

socket.emit('userConnected', nickname);

saveNicknameBtn.addEventListener('click', () => {
  const newNickname = nicknameInput.value;

  sessionStorage.setItem('nickname', newNickname);
  nicknameInput.value = '';

  socket.emit('changeNickname', newNickname);
});

const createNewMessage = (data) => {
  const newMessage = document.createElement('p');
  newMessage.innerHTML = data;
  newMessage.dataset.testid = 'message';
  
  chat.appendChild(newMessage);
};

const getUsers = (users) => {
  const oldUsers = document.querySelectorAll('.user-online-name');

  if (oldUsers.length !== 0) {
    oldUsers.forEach((oldUser) => {
      usersElement.removeChild(oldUser);
    });
  }

  const myUser = users.find((user) => user.socketId === socketId);
  const newUserList = users.filter((user) => user.socketId !== socketId);
  newUserList.unshift(myUser);

  newUserList.forEach((user) => {
    const userElem = document.createElement('p');
    userElem.innerHTML = user.nickname;
    userElem.classList.add('user-online-name');
    userElem.dataset.testid = 'online-user';
    usersElement.appendChild(userElem);
  });
};
socket.on('connect', () => {
  socketId = socket.id;
});
socket.on('message', createNewMessage);
socket.on('users', getUsers);
