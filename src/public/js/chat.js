const socket = window.io();
const inputNickname = document.querySelector('#nicknameInput');
const inputNickBtn = document.querySelector('#nickname-btn');
const usersUl = document.querySelector('#users');
const formMessages = document.querySelector('#message-form');
const inputMessage = document.querySelector('#messageInput');

let nickname = '';

// envia msg p servidor
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(inputMessage.value);
  socket.emit('message', { 
    chatMessage: inputMessage.value,
    nickname,
  });
  inputMessage.value = '';
  return false;
});

// envia inputNickname para server
inputNickBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = inputNickname.value;
  inputNickname.value = '';
  socket.emit('saveNickname', nickname);
});

// cria li e appenda na ul de menssagens
const createMessage = (message) => {
  console.log(message);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messageUl.appendChild(li);
};

// altera nickname para randomUser e envia comando para atualizar a lista de usuários online
const createUser = (user) => {
  nickname = user;
  socket.emit('usersOnCli');
};

// cria li e appenda na ul de usuários online
const renderUsersOnline = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  console.log(li);
  li.setAttribute('data-testid', 'online-user');
  usersUl.appendChild(li);
};

// recebe o array de usuários do servidor e manda para renderUsersOnline
const getUsersOnline = (users) => {
  usersUl.innerHTML = '';
  users.forEach((u) => renderUsersOnline(u));
};

// escuta eventos do server
socket.on('message', (message) => createMessage(message));
socket.on('randomUser', (user) => createUser(user));
socket.on('usersOnServ', (users) => getUsersOnline(users));