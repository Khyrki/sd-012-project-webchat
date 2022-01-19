const socket = window.io();

/* paths de elementos */
const list = document.querySelector('#messages');
const listUsers = document.querySelector('#nicksList');
const sendMensage = document.querySelector('#send-button');
const mensageInput = document.querySelector('#message-box');
const nickNameChange = document.querySelector('#nickname-box');
const sendNickname = document.querySelector('#nickname-button');

/* Criar li com a mensagem */
const createMensage = (value, attribute) => {
  const newLi = document.createElement('li');
  if (attribute) {
    newLi.setAttribute(`${attribute[0]}`, `${attribute[1]}`);
  }
  newLi.innerHTML = value;
  list.appendChild(newLi);
};

/* Criar li com os usuarios */
const createUser = (value, attribute) => {
  const newLi = document.createElement('li');
  if (attribute) {
    newLi.setAttribute(`${attribute[0]}`, `${attribute[1]}`);
  }
  newLi.innerHTML = value;
  listUsers.appendChild(newLi);
};

/* Gerar nick com 16 caracteres pelo socketID */
const makeNick = (value) => value.slice(4);

/* Limpa usuários na tela */
const clearUsers = () => {
  while (listUsers.firstChild) {
    listUsers.removeChild(listUsers.lastChild);
  }
};

/* Mover nickname do usuario para o 1 do array 
https://www.codegrepper.com/code-examples/javascript/change+position+of+element+in+array+javascript */
function moveElement(array, initialIndex, finalIndex) {
  array.splice(finalIndex, 0, array.splice(initialIndex, 1)[0]);
  console.log(array);
  return array;
}

/* EventListener para o envio da mensagem */
sendMensage.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  if (mensageInput.value) {
    socket.emit('message', { chatMessage: mensageInput.value, nickname });
  }
  mensageInput.value = '';
});

/* EventListener para o envio de nickname */
sendNickname.addEventListener('click', (e) => {
  e.preventDefault();
  const oldNick = sessionStorage.getItem('nickname');
  const newNick = nickNameChange.value;
  sessionStorage.setItem('nickname', newNick);
  if (newNick) {
    socket.emit('updateNickname', newNick, oldNick);
  }
  mensageInput.value = '';
});

/* Ao conectar e gerado o nickname e armazenado no sessionStorage */
socket.on('connect', () => {
  const nickName = makeNick(socket.id);
  sessionStorage.setItem('nickname', nickName);
  socket.emit('newUser', nickName);
});

/* Atualizar a lista de usuarios na view */
socket.on('updateUsersList', (users) => {
  clearUsers();
  const nickname = sessionStorage.getItem('nickname');
  const position = users.findIndex((user) => user === nickname);
  const newA = moveElement(users, position, 0);
  newA.forEach((user) => createUser(user, ['data-testid', 'online-user']));
});

/* Criação da mensagem */
socket.on('message', (msg) => createMensage(msg, ['data-testid', 'message']));

/* Antes de atualizar/fechar */
window.onbeforeunload = () => {
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('disconnect', nickname);
  socket.disconnect();
};
