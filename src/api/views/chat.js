const socket = window.io();

const form = document.querySelector('form');
const formNick = document.querySelector('#formNick');
const inputMessage = document.querySelector('#messageInput');
const currentUser = document.querySelector('#currentUser');

const createInitialNick = (nick) => {
  currentUser.innerText = nick;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: currentUser.innerText });
  inputMessage.value = '';
  return false;
});

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  const fieldNick = document.querySelector('#nickName');
  const userNickName = fieldNick.value;
  currentUser.innerText = userNickName;
  socket.emit('changeNick', userNickName);
  fieldNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

const createUser = (user, userListUl) => {
  const li = document.createElement('li');
  li.innerText = user.nick;
  li.dataset.testid = 'online-user';
  userListUl.appendChild(li);
};

const createUserList = (userArray) => {
  const userListUl = document.querySelector('#onlineUsers');
  userListUl.innerHTML = '';
  userListUl.appendChild(currentUser);
  const userNick = currentUser.innerText;
  const userIndex = userArray.findIndex((user) => user.nick === userNick);
  userArray.splice(userIndex, 1);

  userArray.forEach((user) => {
    createUser(user, userListUl);
  });
};

socket.on('hello', ({ _msg, initialNick }) => {
  // createMessage(msg);
  createInitialNick(initialNick);
});
socket.on('message', (message) => createMessage(message));
socket.on('onlineList', (userArray) => createUserList(userArray));
