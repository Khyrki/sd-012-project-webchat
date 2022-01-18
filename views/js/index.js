const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const userForm = document.querySelector('#login');
const inputUser = document.querySelector('#nickNameInput');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('login', { id: socket.id, newName: inputUser.value });
  
  inputUser.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', { chatMessage: inputMessage.value });
  
  inputMessage.value = '';
  return false;
});

const createLi = (liText, ulId, dataTextId) => {
  const ul = document.querySelector(ulId);
  const li = document.createElement('li');
  li.setAttribute('data-testid', dataTextId);
  li.innerText = liText;
  ul.appendChild(li);
};

socket.on('userOnline', (users) => {
  const usersUl = document.querySelector('#users');
  usersUl.innerHTML = '';

  users.forEach(({ nickname }) => createLi(nickname, '#users', 'online-user'));
});

socket.on('message', (chatMessage) => createLi(chatMessage, '#messages', 'message'));

window.onbeforeunload = (_e) => socket.disconnect();