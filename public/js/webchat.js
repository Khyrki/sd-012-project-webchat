const socket = window.io();

let nickname;
socket.on('connect', () => {
  nickname = socket.id.slice(0, 16);
});

const changeButton = document.getElementById('changeNickname');
const changeInput = document.querySelectorAll('input')[0];
const sendButton = document.getElementById('sendMessage');
const input = document.querySelectorAll('input')[1];
const chat = document.getElementById('chat');
const ul = document.getElementById('users');

const changeNickname = (event) => {
  event.preventDefault();    
  nickname = changeInput.value;
  changeInput.value = '';
  socket.emit('changeNickname', nickname);
};

changeButton.addEventListener('click', changeNickname);

const sendMessage = (event) => {
  event.preventDefault();    
  socket.emit('message', {
    chatMessage: input.value,
    nickname,
  });
};

sendButton.addEventListener('click', sendMessage);

const createMessage = (message) => {
  const li = document.createElement('li');
  li.className = 'chatMessages';
  li.innerText = message;
  li.dataset.testid = 'message';
  chat.appendChild(li);
};

const renderMesageHistory = (messages) => {
  messages.forEach(({ nickname: user, timestamp, message }) => (
    createMessage(`${timestamp} - ${user} : ${message}`)
  ));
};

const createUser = ({ id, nickname: name }) => {
  const li = document.createElement('li');
    if (name) {
      li.innerText = name;
    } else {
      li.innerText = id.slice(0, 16);
    }
    li.dataset.testid = 'online-user';
    ul.appendChild(li);
};

const formatUsersArray = (users) => {
  const myUser = users.find((user) => user.id === socket.id);
  const otherUsers = users.filter((user) => user.id !== socket.id);
  return [myUser, ...otherUsers];
};

const renderUsers = (users) => users.forEach((user) => createUser(user));

socket.on('message', (message) => createMessage(message));

socket.on('users', (users) => {
  console.log(users);
  ul.innerHTML = '';
  renderUsers(formatUsersArray(users));
});

socket.on('history', (messages) => renderMesageHistory(messages));