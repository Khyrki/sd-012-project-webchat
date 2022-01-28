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

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
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

const connectUser = () => {
  const { nickname } = sessionStorage;

  if (nickname) {
    socket.emit('newNickname', nickname);
    userNickname = nickname;
  }
};

socket.on('getNick', ((nick) => {
  userNickname = nick;
}));

socket.on('usersOnline', (users) => usersOnline(users));
socket.on('message', (message) => createMessage(message));

window.onload = () => {
  connectUser();
};

window.onbeforeunload = () => {
  socket.disconnect();
};