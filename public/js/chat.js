const socket = window.io();

const nickname = document.querySelector('.nickname');
const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('nicknameChange', { oldNick: nickname.innerHTML, newNick: nicknameInput.value });
  nicknameInput.value = '';
});

const changeHTMLNickName = (newNickname) => {
  nickname.innerHTML = newNickname;
};

messageForm.addEventListener('submit', (e) => {
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
  const thisNickname = document.querySelector('.nickname');
  const allUsers = [...users];
  const arrayPos = allUsers.findIndex((list) => list.nickname === thisNickname.innerHTML);
  const thisUser = allUsers.splice(arrayPos, 1);
  allUsers.unshift(thisUser[0]);
  console.log(thisNickname.innerHTML, allUsers);
  const userList = document.querySelector('.userList');
  userList.innerHTML = '';
  allUsers.map(({ nickname: userNick }) => {
    const li = document.createElement('li');
    li.dataset.testid = 'online-user';
    li.innerText = userNick;
    userList.appendChild(li);
    return false;
  });
};

socket.on('message', (message) => createMessage(message));

socket.on('nicknameChange', (newNickname) => changeHTMLNickName(newNickname));

socket.on('userList', (users) => createUserList(users));

window.onload = async () => {
  await socket.on('connect', () => { nickname.innerHTML = socket.id.slice(0, 16); });
};