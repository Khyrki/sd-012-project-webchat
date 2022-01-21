const socket = window.io();

const TEST_ID = 'data-testid';
const ONLINE_USER = 'online-user';

// executado toda vez que alguem se conecta ao chat.
const inputMessage = document.querySelector('#message-input');
const inputNick = document.querySelector('#nickname-input');
const buttonNick = document.querySelector('#nickname-button');
const ul = document.querySelector('#users');
const form = document.querySelector('form');
let loggedUsers = [];

// renderiza nome do usuario
const renderUsers = (users) => {
  console.log('ooois');
  users.forEach((user) => {
    if (loggedUsers.includes(user)) return;
    
    const p = document.createElement('p');
    const li = document.createElement('li');
    p.setAttribute(TEST_ID, ONLINE_USER);

    p.innerText = user;
  
    li.appendChild(p);
    ul.appendChild(li);
    loggedUsers.push(user);
  });
};

const attUsers = (users) => { 
  loggedUsers = users;
  ul.innerHTML = '';
  users.forEach((user) => {
    const p = document.createElement('p');
    const li = document.createElement('li');
    p.setAttribute(TEST_ID, ONLINE_USER);

    p.innerText = user;
  
    li.appendChild(p);
    ul.appendChild(li);
    loggedUsers.push(user);
  });
};

socket.on('attUsers', (users) => attUsers(users));
socket.on('nickname', (users) => renderUsers(users));

// troca nome do user
buttonNick.addEventListener('click', () => {
  const { value } = inputNick;
  
  socket.emit('changenick', value);
});

// Chama o evento 'message' e executa a funcao CreateMessage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value: chatMessage } = inputMessage;
  socket.emit('message', { chatMessage });
});

// executada ao ser enviada uma mensagem
const createMessage = (message) => {
  const messageUL = document.querySelector('#messages');
  const li = document.createElement('li');
  const p = document.createElement('p');
  li.setAttribute(TEST_ID, 'message');
  p.setAttribute(TEST_ID, ONLINE_USER);

  p.innerText = message;
  li.appendChild(p);
  messageUL.appendChild(li);
};
socket.on('message', (msg) => createMessage(msg));