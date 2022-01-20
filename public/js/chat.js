const socket = window.io();
const TEST_ID = 'data-testid';

// executado toda vez que alguem se conecta ao chat.
const randomNick = () => {
  const result = [];
  for (let i = 0; i < 16; i += 1) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  const concatResult = result.join('');
  return concatResult;
};
let nickname = randomNick();

const inputMessage = document.querySelector('#messageInput');
const inputNick = document.querySelector('#nickname-input');
const buttonNick = document.querySelector('#nickname-button');
const form = document.querySelector('form');

const user = document.createElement('p');
user.innerText = nickname;
user.setAttribute(TEST_ID, 'online-user');
form.appendChild(user);

// Chama o evento 'message' e executa a funcao CreateMessage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value: chatMessage } = inputMessage;
  socket.emit('message', { chatMessage, nickname });
});

// troca nome do user
buttonNick.addEventListener('click', (_e) => {
  if (!inputNick) return null;

  const { value: newNick } = inputNick;
  nickname = newNick;
  user.innerText = nickname;
});

// executada ao ser enviada uma mensagem
const createMessage = (message) => {
  const messageUL = document.querySelector('#messages');
  const li = document.createElement('li');
  const p = document.createElement('p');
  li.setAttribute(TEST_ID, 'message');
  p.setAttribute(TEST_ID, 'online-user');
  
  p.innerText = message;
  li.appendChild(p);
  messageUL.appendChild(li);
};
socket.on('message', (msg) => createMessage(msg));