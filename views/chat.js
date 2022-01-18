const socket = window.io();

const gerenateRandomString = (size) => {
  let randomString = '';
  const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i += 1) {
      randomString += caracters.charAt(Math.floor(Math.random() * caracters.length));
  }
  return randomString;
};

const passingUserForDocument = (user) => {
  const span = document.querySelector('span');
  const newUser = user || gerenateRandomString(16);
  sessionStorage.setItem('nickname', newUser);
  span.innerText = `${newUser}`;
};

passingUserForDocument();

socket.emit('newUser', sessionStorage.getItem('nickname'));

const messageButton = document.querySelector('#message-button');
const messageList = document.querySelector('#message-list');
const nicknameButton = document.querySelector('#nickname-button');
const usersList = document.querySelector('#users-list');

socket.on('message', (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messageList.appendChild(li);
});

socket.on('newUser', (users) => {
  usersList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.nickname;
    usersList.appendChild(li);
  });
});

socket.on('nickUpdate', (users) => {
  usersList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.nickname;
    usersList.appendChild(li);
  });
});

messageButton.addEventListener('click', () => {
  const messageInput = document.querySelector('#message-input');
  const nickname = sessionStorage.getItem('nickname') || socket.id;
  socket.emit('message', { chatMessage: messageInput.value, nickname });
  messageInput.value = '';
});

nicknameButton.addEventListener('click', () => {
  const nicknameInput = document.querySelector('#nickname-input');
  sessionStorage.setItem('nickname', nicknameInput.value);
  passingUserForDocument(nicknameInput.value);
  socket.emit('nickUpdate', nicknameInput.value);
  nicknameInput.value = '';
});