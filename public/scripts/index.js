const socket = window.io();

const setStorage = (nick) => sessionStorage.setItem('nickName', nick);
const getStorage = () => sessionStorage.getItem('nickName');

const nickName = document.querySelector('#nickName');
const nickNameButton = document.querySelector('#nickname-button');
const messageBox = document.querySelector('#message-box');
const sendButton = document.querySelector('#send-button');
const onUser = document.querySelector('.onUsers');

const newMsg = (msg) => {
  const message = document.querySelector('.msg');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = `${msg}`;
  message.appendChild(li);
  return li;
};

const getOnUsers = (nick) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = nick;
  onUser.appendChild(li);
};

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const message = messageBox.value;
  socket.emit('message', ({ nickname: nickName.innerText, chatMessage: message }));
  messageBox.value = '';
});

nickNameButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nickNameBox = document.querySelector('#nickname-box');
  setStorage(nickNameBox.value);
  socket.emit('upNickName', nickNameBox.value);
  nickNameBox.value = '';
});

socket.on('getNickName', ((nick) => {
  nickName.innerHTML = nick;
}));

socket.on('message', (message) => newMsg(message));

socket.on('onlineUsers', (users) => {
  onUser.innerHTML = '';
  const list = Object.values(users);
  const index = list.indexOf(nickName.innerText);
  getOnUsers(list[index]);
  list.filter((user) => user !== list[index]).forEach((nick) => getOnUsers(nick));
});

window.onload = () => {
  const nick = getStorage();
  if (nick) socket.emit('upNickName', nick);
};

window.onbeforeunload = () => {
  socket.disconnect();
}; 