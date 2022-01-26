const socket = window.io();

const form = document.querySelector('#chat-form');
const inputMessage = document.querySelector('#msg');
const renameNick = document.querySelector('.btn-nickname');
const user = document.querySelector('#user');
const ulUsers = document.querySelector('#users');
const username = document.querySelector('#username');
const data = 'data-testid';

renameNick.addEventListener('click', (event) => {
  event.preventDefault();
  user.innerText = username.value;
  socket.emit('rename', user.innerText);
});

form.addEventListener('submit', (event) => {
  const nickname = user.innerText;
  event.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  return false;
});

const onlineUser = (nickname) => {
  user.innerText = nickname;
}; 

const listUsers = (item) => {
  ulUsers.innerHTML = '';
  const loi = document.createElement('li');
  loi.setAttribute(data, 'online-user');
  loi.innerText = user.innerText;
  ulUsers.appendChild(loi);
  
  item.forEach(({ nickname }) => {
    if (nickname === user.innerText) return;
    const li = document.createElement('li');
    li.setAttribute(data, 'online-user');
    li.innerText = nickname;
    ulUsers.appendChild(li);
  });
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
  pText.setAttribute(data, 'message');
    messagesUl.appendChild(pText);
};

const getAllMessages = (arrMessages) => {
  arrMessages.forEach(({ message, nickname, timestamp }) => {
    createMessage(`${timestamp} - ${nickname}: ${message}`);
  });
};

socket.on('list', (item) => listUsers(item));
socket.on('getMessages', (arrMessages) => getAllMessages(arrMessages));
socket.on('message', (chatMessage) => createMessage(chatMessage));
socket.on('nickname', (nickname) => onlineUser(nickname));
