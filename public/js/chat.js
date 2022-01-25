const socket = window.io();

const form = document.querySelector('#chat-form');
const inputMessage = document.querySelector('#msg');
const renameNick = document.querySelector('.btn-nickname');
const user = document.querySelector('#user');
const username = document.querySelector('#username');

renameNick.addEventListener('click', (event) => {
  event.preventDefault();
  user.innerText = username.value;
});

form.addEventListener('submit', (event) => {
  const nickname = document.querySelector('#user').innerText;
  event.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  return false;
});

const onlineUser = (nickname) => {
  user.setAttribute('data-testid', 'online-user');
  user.innerText = nickname;
}; 

const createMessage = (chatMessage) => {
  console.log(chatMessage);
  const messagesUl = document.querySelector('.chat-messages');
/*
  Não roda no teste o 'modelo com css'
  console.log(chatMessage, timestamp);
  const div = document.createElement('div');
  div.className = 'message';

  const p = document.createElement('p');
  p.className = 'meta';
    div.appendChild(p);

  const span = document.createElement('span');
  span.innerText = timestamp;
    p.appendChild(span);

  const pText = document.createElement('p');
  pText.className = 'text';
    div.appendChild(pText);

  pText.innerText = chatMessage;
    messagesUl.appendChild(div);
*/

  const pText = document.createElement('p');
  pText.innerText = chatMessage;
  pText.setAttribute('data-testid', 'message');
    messagesUl.appendChild(pText);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));
socket.on('nickname', (nickname) => onlineUser(nickname));
