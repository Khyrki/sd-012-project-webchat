const socket = window.io();
const nickNameForm = document.querySelector('#nickNameForm');
const inputedNickname = document.querySelector('#inputNickname');
const messageForm = document.querySelector('#messageForm');
const inputedMessage = document.querySelector('#inputMessage');
let nickname;
const userTag = document.querySelector('#userTag');
const newNick = document.querySelector('#nickname-li');
const ul = document.querySelector('#usersOnline-ul');

nickNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = inputedNickname.value;
  socket.emit('updateNickName', inputedNickname.value /* || socket.id.substring(0, 16) */); // não influenciou no teste req2 (ass.: cristiano)
  inputedNickname.value = '';
  userTag.innerText = nickname;
  newNick.innerText = nickname;
  return false;
});

const changeNickName = (nick) => {
  newNick.innerText = nick;
  userTag.innerText = nick;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // const nick = nicknames || socket.id.substring(0, 16);
  socket.emit('message', { chatMessage: inputedMessage.value, nickname });
  inputedMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const ulMessages = document.querySelector('#messages-ul');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  ulMessages.appendChild(li);
};

const showOnlineUsers = (onlineUsers) => {
  onlineUsers.forEach((user) => {
    if (user.id !== socket.id) {
      const li = document.createElement('li');
      li.innerText = user.nickname;
      li.setAttribute('data-testid', 'online-user');
      ul.appendChild(li);
    }
  });  
};

socket.on('randomNickName', (randomNickName) => {
  changeNickName(randomNickName);
});

socket.on('message', (message) => createMessage(message));
socket.on('connection', (onlineUsers) => {
  // const ul = document.querySelector('#usersOnline-ul');
  ul.innerHTML = ''; // para limpar as "lis" de dentro
  // onlineUsers.forEach((user) => {
  //   if (user.id !== socket.id) showOnlineUsers(user.nickname);
  // })
  showOnlineUsers(onlineUsers);
  
  console.log(onlineUsers); // lista de usuários
});

window.onbeforeunload = () => {
  socket.disconnect();
}; 
