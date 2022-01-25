const socket = window.io();

const formMensage = document.querySelector('#formMensage');
const mensageInput = document.querySelector('#mensageInput');
const messages = document.querySelector('#messages');

const generateNick = (value) => value.splice(0, 16);

const buildMensage = (value, attribute) => {
  const msg = document.createElement('li');
  if (attribute) {
    msg.setAttribute(`${attribute[0]}, ${attribute[1]}`);
  }
  msg.innerHTML = value;
  messages.appendChild(msg);
};

formMensage.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  if (mensageInput.value) {
    socket.emit('message', { chatMessage: mensageInput.value, nickname });
  }
  mensageInput.value = '';
});

socket.on('connect', () => {
  const nick = generateNick(socket.id);
  sessionStorage.setItem('nickname', nick);
  socket.emit('newUser', nick);
});

socket.on('message', (msg) => buildMensage(msg, ['testid', 'message']));