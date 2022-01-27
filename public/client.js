const socket = window.io(); 

const usersList = document.querySelector('#users'); 
const messagesList = document.querySelector('#messages'); 
const nicknameInput = document.querySelector('#nickname'); 
const messageInput = document.querySelector('#messageBox'); 
const nicknameBtn = document.querySelector('#nicknameBtn'); 
const sendBtn = document.querySelector('#sendBtn'); 

const generateNickname = (length) => { // gera um nickname aleatório
  let result = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return result;
};

let nicknameGenerate = generateNickname(16); 

socket.emit('newUser', nicknameGenerate); 

const createMessage = (newMessage) => { 
  const li = document.createElement('li');
  li.innerText = newMessage;
  li.setAttribute('data-testid', 'message');
  messagesList.appendChild(li);
};

const userList = (user) => { 
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  usersList.appendChild(li);
};

nicknameBtn.addEventListener('click', () => {
  nicknameGenerate = nicknameInput.value; 
  nicknameInput.value = ''; 
  socket.emit('nickname', nicknameGenerate); 
});

sendBtn.addEventListener('click', () => { 
  socket.emit('message', { 
    nickname: nicknameGenerate,
    chatMessage: messageInput.value, 
  });
 
  nicknameGenerate = '';
  messageInput.value = '';
  return false;
});

userList(nicknameGenerate);
socket.on('message', (newMessage) => {
  createMessage(newMessage); 
});

// socket de mensagens de user
socket.on('messageLoad', (newMessage) => {
  createMessage(newMessage); 
});

// socket de user
socket.on('loadUsers', (users) => {
  usersList.innerHTML = '';
  userList(nicknameGenerate);
  console.log(users);
  users.forEach((user) => {
    if (user !== nicknameGenerate) {
      return userList(user);
    }
  });
});