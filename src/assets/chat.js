const socket = window.io();

const userOnline = document.querySelector('[data-testid="online-user"]');
const userList = document.getElementById('user-list');

const nickNameBox = document.querySelector('[data-testid="nickname-box"]');
const nickNameBtn = document.querySelector('[data-testid="nickname-button"]');

const sendMessageBtn = document.querySelector('[data-testid="send-button"]');
const messageBox = document.querySelector('[data-testid="message-box"]');
const messageList = document.getElementById('message');

socket.on('nickname', (nick) => {
  userOnline.innerHTML = nick;
});

socket.on('userList', (listUser) => {
  const list = JSON.parse(listUser);
  userList.innerHTML = '';
  list.forEach((name) => {
    const li = document.createElement('li');
    li.innerHTML = name;
    userList.appendChild(li);
  });
});

socket.on('message', (msg) => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  li.setAttribute('data-testid', 'message');
  messageList.appendChild(li);
});

const sendMessage = () => {
  const nickname = userOnline.innerHTML;
  const chatMessage = messageBox.value;
  socket.emit('message', { nickname, chatMessage });
  userOnline.innerHTML = '';
};

const changeNickname = () => {
  const oldName = userOnline.innerHTML;
  const newName = nickNameBox.value;
  socket.emit('changeName', JSON.stringify({ oldName, newName }));
  userOnline.innerHTML = '';
};

nickNameBtn.addEventListener('click', changeNickname);
sendMessageBtn.addEventListener('click', sendMessage);