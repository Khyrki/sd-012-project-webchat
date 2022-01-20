const socket = window.io();

const dataTestId = 'data-testid';

const userBox = document.querySelector('.nickBox');
const userNick = document.querySelector('.nickInput');
const messageBox = document.querySelector('.messageBox');
const inputMessage = document.querySelector('.messageInput');

messageBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

userBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientUser', userNick.value);
  userNick.value = '';
  return false;
});

const dateFormat = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const splitedDate = date.split(' ');
  const formatedDate = `
  ${splitedDate[2]}-${months.indexOf(splitedDate[1])}-${splitedDate[3]} ${splitedDate[4]}
  `;

  return formatedDate;
};

const saveMessage = (message, nickname, timestamp) => {
  socket.emit('saveMessage', { message, nickname, timestamp });
  // console.log(message, nickname, timestamp);
  return false;
};

const loadMessages = (messageInfo) => {
  const { nickname, message, timestamp } = messageInfo;
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${timestamp} - ${nickname}: ${message}`;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const createMessage = (messageInfo) => {
  const nickName = sessionStorage.getItem(messageInfo.id);
  const { message } = messageInfo;
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  const date = dateFormat(`${new Date()}`);
  saveMessage(message, nickName, date);
  li.innerText = `${date} - ${nickName}: ${message}`;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const deleteUser = (id) => {
  const messagesUl = document.querySelector('.users');
  const user = document.getElementById(id);
  if (!user) return false;
  messagesUl.removeChild(user);
};

const createUser = (nicknameInfo) => {
  sessionStorage.setItem(nicknameInfo.id, nicknameInfo.nickname);
  const messagesUl = document.querySelector('.users');
  const user = document.getElementById(nicknameInfo.id);
  if (user) deleteUser(nicknameInfo.id);
  const li = document.createElement('li');
  li.innerText = nicknameInfo.nickname;
  li.setAttribute(dataTestId, 'online-user');
  li.setAttribute('id', nicknameInfo.id);
  messagesUl.appendChild(li);
};

socket.on('loadMessages', (messageInfo) => loadMessages(messageInfo));
socket.on('serverMessage', (messageInfo) => createMessage(messageInfo));
socket.on('createUser', (nicknameInfo) => createUser(nicknameInfo));
socket.on('deleteUser', (id) => deleteUser(id));

socket.emit('joinRoom');

window.onbeforeunload = (_event) => {
  socket.disconnect();
};