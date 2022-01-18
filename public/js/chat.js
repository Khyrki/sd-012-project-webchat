const socket = window.io();

/* paths de elementos */
const formMensage = document.querySelector('#formMensage');
const mensageInput = document.querySelector('#mensageInput');
const list = document.querySelector('#messages');
const listUsers = document.querySelector('#nicksList');

/* Criar li com a mensagem */
const createMensage = (value, attribute) => {
  const newLi = document.createElement('li');
  if (attribute) {
    newLi.setAttribute(`${attribute[0]}, ${attribute[1]}`);
  }
  newLi.innerHTML = value;
  list.appendChild(newLi);
};

/* Criar li com os usuarios */
const createUser = (value, attribute) => {
  const newLi = document.createElement('li');
  if (attribute) {
    newLi.setAttribute(`${attribute[0]}, ${attribute[1]}`);
  }
  newLi.innerHTML = value;
  listUsers.appendChild(newLi);
};

/* Gerar nick com 16 caracteres pelo socketID */
const makeNick = (value) => value.splice(0, 16);

/* EventListener para o form de mensagem */
formMensage.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  if (mensageInput.value) {
    socket.emit('message', { chatMessage: mensageInput.value, nickname });
  }
  mensageInput.value = '';
});

/* Ao conectar e gerado o nickname e armazenado no sessionStorage */
socket.on('connect', () => {
  const nickName = makeNick(socket.id);
  sessionStorage.setItem('nickname', nickName);
  socket.emit('newUser', nickName);
});

socket.on('updateUsersList', (users) => {
  users.forEach((user) => createUser(user, ['testid', 'online-user']));
});

/* Criação da mensagem */
socket.on('message', (msg) => createMensage(msg, ['testid', 'message']));
