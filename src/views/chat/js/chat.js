const socket = window.io();

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

const createMessage = (messageInfo) => {
  const nickName = sessionStorage.getItem(messageInfo.id);
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  const date = `${new Date()}`;
  console.log(new Date(), date);
  li.innerText = `${dateFormat(date)} - ${nickName}: ${messageInfo.message}`;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const deleteUser = (id) => {
  const messagesUl = document.querySelector('.users');
  const user = document.querySelector(`#${id}`);
  messagesUl.removeChild(user);
};

const createUser = (nicknameInfo) => {
  sessionStorage.setItem(nicknameInfo.id, nicknameInfo.nickname);
  const messagesUl = document.querySelector('.users');
  const user = document.querySelector(`#${nicknameInfo.id}`);
  const li = document.createElement('li');
  li.innerText = nicknameInfo.nickname;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', nicknameInfo.id);
  if (user) deleteUser(nicknameInfo.id);
  messagesUl.appendChild(li);
};

socket.on('serverMessage', (messageInfo) => createMessage(messageInfo));
socket.on('createUser', (nicknameInfo) => createUser(nicknameInfo));
socket.on('deleteUser', (id) => {
  console.log(id);
  deleteUser(id);
});

socket.emit('joinRoom');

window.onbeforeunload = (_event) => {
  socket.disconnect();
};