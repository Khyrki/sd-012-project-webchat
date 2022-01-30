const socket = window.io();

const formMsg = document.querySelector('.form-msg');
const inputMessage = document.querySelector('.messageInput');
const nickText = document.querySelector('.name');
const msg = document.querySelector('.messageInput');
const nickname = document.querySelector('.nickname-box');
const nicknameBtn = document.querySelector('#nickname-button');

nicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nickText.innerHTML = nickname.value;
  socket.emit('nicknameList', nickname.value);
  nickname.value = '';
});

socket.on('nickname', (name) => {
  nickText.innerText = name;
});

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: msg.value, nickname: nickText.innerText });
  inputMessage.value = '';
  console.log(inputMessage);
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));

const ulUserList = document.querySelector('.online-list');
socket.on('usuariosConectados', (usersList) => {
  console.log('test', usersList);
  ulUserList.innerHTML = '';

  const user = usersList.find(({ id }) => id === socket.id); // guarda o usuário da página atual para colocá-lo no topo da lista de usuários mais adiante.

// console.log('socket.id de cada cliente >', socket.id);

const userFilter = usersList.filter(({ id }) => id !== socket.id); // guarda a lista de todos os usuários connectados, exceto ele mesmo.
// Obs.: gera um novo array.

userFilter.unshift(user); // coloca o usuário atual no topo da lista 

userFilter.forEach((userL) => {
    const li = document.createElement('li');
    li.innerText = userL.nickname;
    li.setAttribute('data-testid', 'online-user');
    ulUserList.appendChild(li);
  });
});

socket.on('newName', (newName) => {
  nickText.innerText = newName;
});
