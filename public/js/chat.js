const socket = window.io();

const nicknameClass = '.onlineUser';

const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  const nickname = document.querySelector(nicknameClass);
  e.preventDefault();
  socket.emit('nicknameChange', { oldNick: nickname.innerHTML, newNick: nicknameInput.value });
  nicknameInput.value = '';
});

const changeHTMLNickName = (newNickname) => {
  const nickname = document.querySelector(nicknameClass);
  nickname.innerHTML = newNickname;
};

messageForm.addEventListener('submit', (e) => {
  const nickname = document.querySelector(nicknameClass);
  e.preventDefault();
  socket.emit('message', { nickname: nickname.innerHTML, chatMessage: inputMessage.value });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createUserList = (users) => {
  const thisNickname = document.querySelector(nicknameClass);
  const allUsers = [...users];
  const arrayPos = allUsers.findIndex((list) => list.nickname === thisNickname.innerHTML);
  const thisUser = allUsers.splice(arrayPos, 1);
  allUsers.unshift(thisUser[0]);
  const userList = document.querySelector('.userList');
  userList.innerHTML = '';
  console.log(allUsers);
  allUsers.map(({ nickname: userNick }) => {
    const li = document.createElement('li');
    li.dataset.testid = 'online-user';
    li.className = 'onlineUser';
    li.innerText = userNick;
    userList.appendChild(li);
    return false;
  });
  console.log(document.querySelectorAll('[data-testid=online-user]'));
};

socket.on('message', (message) => createMessage(message));

socket.on('nicknameChange', (newNickname) => changeHTMLNickName(newNickname));

socket.on('userList', (users) => createUserList(users));

window.onload = async () => {
  await socket.on('connect', () => createUserList([socket.id.slice(0, 16)]));
};

window.onbeforeunload = () => {
  socket.disconnect();
};

socket.emit('newUser');