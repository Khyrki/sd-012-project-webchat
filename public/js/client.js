const socket = window.io();

const formUser = document.querySelector('.nickname-btn');
const form = document.querySelector('.form');
const textBox = document.querySelector('.message-input');
const nicknameUser = document.querySelector('.nickname-input');
const messagesUsers = document.querySelector('.messages');
const usersConected = document.querySelector('.users');

let nickname = '';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // preventDefault vai parar o formulario
  socket.emit('message', {
    nickname,
    chatMessage: textBox.value,
  });
  textBox.value = '';
  return false;
});

formUser.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = nicknameUser.value;
  // preventDefault vai parar o formulario
  socket.emit('saveNick', nicknameUser.value);
  nicknameUser.value = '';
});

const createMessages = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');

  messagesUsers.appendChild(li);
};

const userCreated = (newId) => {
  nickname = newId;
  socket.emit('usuariosOnline');
};

const getMessages = (messages) => {
  messages.forEach(({ timestamp, nickname: nick, chatMessage }) => {
    createMessages(`${timestamp} - ${nick}: ${chatMessage}`);
  });
};

const atualizaUsuarios = (usuario) => {
  const li = document.createElement('li');
  li.innerText = usuario.nickname;
  li.setAttribute('data-testid', 'online-user');
  usersConected.appendChild(li);
};

const getUsersOnline = (users) => {
  usersConected.innerHTML = '';
  const user = users.find((item) => item.id === socket.id);
  atualizaUsuarios(user);
  users.forEach((item) => item.id !== socket.id && atualizaUsuarios(item));
};

socket.on('message', createMessages);
socket.on('newUser', userCreated);
socket.on('messagesAll', getMessages);
socket.on('usuariosOnline', getUsersOnline);
