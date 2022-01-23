// const socket = window.io();
// const nickNameForm = document.querySelector('#nickNameForm');
// const inputedNickname = document.querySelector('#inputNickname');
// const messageForm = document.querySelector('#messageForm');
// const inputedMessage = document.querySelector('#inputMessage');
// let nicknames;

// nickNameForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   nicknames = inputedNickname.value;
//   socket.emit('nickname', inputedNickname.value || socket.id.substring(0, 16));
//   inputedNickname.value = '';
//   return false;
// });

// const changeNickName = (nick) => {
//   const newNick = document.querySelector('#nickname-li');
//   newNick.innerText = nick;
// };

// // const createNickName = (newNick) => {
// //   const ul = document.querySelector('#nicknames-ul');
// //   const li = document.createElement('li');
// //   li.setAttribute('data-testid', 'online-user');
// //   li.innerText = newNick;
// //   ul.appendChild(li);
// // };

// messageForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const nick = nicknames || socket.id.substring(0, 16);
//   socket.emit('message', { chatMessage: inputedMessage.value, nickname: nick });
//   inputedMessage.value = '';
//   return false;
// });

// const createMessage = (message) => {
//   const ul = document.querySelector('#messages-ul');
//   const li = document.createElement('li');
//   li.setAttribute('data-testid', 'message');
//   console.log(message);
//   li.innerText = message;
//   ul.appendChild(li);
// };

// socket.on('serverNickname', ({ nickname }) => changeNickName(nickname));
// // socket.on('serverNickname', ({ nickname }) => createNickName(nickname));
// socket.on('message', (message) => createMessage(message));

// window.onbeforeunload = () => {
//   socket.disconnect();
// }; 


const socket = window.io();
const nickNameForm = document.querySelector('#nickNameForm');
const inputedNickname = document.querySelector('#inputNickname');
const messageForm = document.querySelector('#messageForm');
const inputedMessage = document.querySelector('#inputMessage');
let nicknames;

nickNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nicknames = inputedNickname.value;
  socket.emit('nickname', inputedNickname.value /* || socket.id.substring(0, 16) */); // não influenciou no teste req2 (ass.: cristiano)
  inputedNickname.value = '';
  return false;
});

const changeNickName = (nick) => {
  const newNick = document.querySelector('#nickname-li');
  newNick.innerText = nick;
};

const createNickName = (newNick) => {
  const ul = document.querySelector('#nicknames-ul');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = newNick;
  ul.appendChild(li);
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = nicknames || socket.id.substring(0, 16);
  socket.emit('message', { chatMessage: inputedMessage.value, nickname: nick });
  inputedMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const ul = document.querySelector('#messages-ul');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  ul.appendChild(li);
};

socket.on('serverNickname', ({ nickname }) => changeNickName(nickname));
socket.on('serverNickname', ({ nickname }) => createNickName(nickname));
socket.on('message', (message) => createMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
}; 
