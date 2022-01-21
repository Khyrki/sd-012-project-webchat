const socket = window.io();

const dataTestId = 'data-testid';

const userBox = document.querySelector('.nickBox');
const userNick = document.querySelector('.nickInput');
const messageBox = document.querySelector('.messageBox');
const inputMessage = document.querySelector('.messageInput');

// const dateFormat = (date) => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const splitedDate = date.split(' ');
//   const formatedDate = `
//   ${splitedDate[2]}-${months.indexOf(splitedDate[1]) + 1}-${splitedDate[3]} ${splitedDate[4]}
//   `;

//   return formatedDate;
// };

messageBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = sessionStorage.getItem(socket.id);
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

userBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientUser', userNick.value);
  userNick.value = '';
  return false;
});

const loadMessages = (messageInfo) => {
  const { nickname, message, timestamp } = messageInfo;
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${timestamp} - ${nickname}: ${message}`;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  socket.emit('saveMessage', message);
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const deleteUser = (userId) => {
  const messagesUl = document.querySelector('.users');
  const user = document.getElementById(userId);
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
socket.on('message', (message) => createMessage(message));
socket.on('createUser', (nicknameInfo) => createUser(nicknameInfo));
socket.on('deleteUser', (userId) => deleteUser(userId));

socket.emit('joinRoom');

window.onbeforeunload = (_event) => {
  socket.disconnect();
};