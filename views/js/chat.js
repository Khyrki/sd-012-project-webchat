const socket = window.io();
const chatUl = document.querySelector('#chatUl');
const formChat = document.querySelector('#formMessage');
const messageInput = document.querySelector('#messageInput');
const formNickname = document.querySelector('#nickname');
const ulNickname = document.querySelector('#ulNickname');
const nicknameInput = document.querySelector('#nicknameInput');

const randomName = (length) => {
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += character.charAt(Math.floor(Math.random() * character.length));
  }
  return result;
};

sessionStorage.setItem('randomName', randomName(16));
const liRandomName = document.createElement('li');
liRandomName.innerHTML = '';
liRandomName.dataset.testid = 'online-user';
ulNickname.appendChild(liRandomName);
liRandomName.innerText = sessionStorage.getItem('randomName');
socket.emit('newUser', sessionStorage.getItem('randomName'));

formNickname.addEventListener('submit', (event) => {
  event.preventDefault();
  sessionStorage.setItem('randomName', nicknameInput.value);
  liRandomName.innerText = nicknameInput.value;
  
  socket.emit('newNickname', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

const onlineUser = (users) => {
  ulNickname.innerText = '';
  users.forEach(({ nickname }) => {
    const currentName = nickname.innerHTML;
    if (currentName === nickname) return '';
    const liNickname = document.createElement('li');
    liNickname.innerText = nickname;
    liNickname.dataset.testid = 'online-user';
    ulNickname.appendChild(liNickname);
  });
};  

formChat.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname: liRandomName.textContent,
    chatMessage: messageInput.value,
  }); 
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  chatUl.appendChild(li);
};

const welcome = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  formChat.appendChild(p);
};

socket.on('welcome', (message) => welcome(message));
socket.on('message', (message) => createMessage(message));
socket.on('onlineUsers', (users) => onlineUser(users));
window.onbeforeunload = () => {
  socket.disconnect();
};
