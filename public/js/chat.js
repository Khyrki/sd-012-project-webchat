const socket = window.io();

const formMensage = document.querySelector('#formMensage');
const mensageInput = document.querySelector('#mensageInput');
const list = document.querySelector('#messages');

/* Criar li com a mensagem */
const createMensage = (value, attribute) => {
  const newLi = document.createElement('li');
  if (attribute) {
    newLi.setAttribute(`${attribute[0]}, ${attribute[1]}`);
  }
  newLi.innerHTML = value;
  list.appendChild(newLi);
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

socket.on('connect', () => {
  const nickName = makeNick(socket.id);
  sessionStorage.setItem('nickname', nickName);
  socket.emit('newUser', nickName);
});

socket.on('message', (msg) => createMensage(msg, ['testid', 'message']));
