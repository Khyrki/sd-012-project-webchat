const socket = window.io();

const createNickName = (nick) => nick.slice(0, 16);

socket.on('connect', () => {
 const nick = createNickName(socket.id);
 sessionStorage.setItem('nickname', nick);
 socket.emit('user', nick);
});

const inputForm = document.querySelector('#message-box');
const buttonForm = document.querySelector('#send-button');

const createMessage = (message) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  ul.appendChild(li);
};

buttonForm.addEventListener('click', (e) => {
e.preventDefault();
const nickName = sessionStorage.getItem('nickname');

socket.emit('message', { chatMessage: inputForm.value, nickName });
inputForm.value = '';
});

socket.on('message', (msg) => createMessage(msg));
