const socket = window.io();

const userForm = document.querySelector('#userForm');
const msgForm = document.querySelector('#messageForm');
const inputMsgPlace = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nickname');

let userNickname = '';
const dataTestId = 'data-testid';

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: userNickname,
    chatMessage: inputMsgPlace.value,
  });
  inputMsgPlace.value = '';
  return false;
});

const createMessage = (msg) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  if (typeof msg === 'object') {
    const { message, nickname, date } = msg;
    li.innerText = `${date} - ${nickname}: ${message}`;
  } else {
    li.innerText = msg;
  }

  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname = inputNickname.value;
  socket.emit('newNickname', userNickname);
  sessionStorage.nickname = userNickname;
  inputNickname.value = '';
  console.log(userNickname);
  return false;
});

const createUser = (user) => {
  const nicksUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute(dataTestId, 'online-user');
  nicksUl.appendChild(li);
};

const usersOnline = (users) => {
  const nicksUl = document.querySelector('#users');
  const list = Object.values(users);
  const userIndex = list.indexOf(userNickname);

  nicksUl.innerHTML = '';
  createUser(list[userIndex]);
  list.filter((user) => user !== list[userIndex]).forEach((nickname) => createUser(nickname));
};

const connect = () => {
  const { nickname } = sessionStorage;

  if (nickname) {
    socket.emit('newNickname', nickname);
    userNickname = nickname;
  }
};

const onlineMsg = (msgs) => {
  msgs.forEach((msg) => {
    const { message, nickname, date } = msg;
    createMessage({ message, nickname, date });
  });
};

socket.on('getNick', ((nick) => { userNickname = nick; }));
socket.on('usersOnline', (users) => usersOnline(users));
socket.on('message', (message) => createMessage(message));
socket.on('loadMessages', (message) => onlineMsg(message));

window.onload = () => {
  connect();
};

window.onbeforeunload = () => {
  socket.disconnect();
};