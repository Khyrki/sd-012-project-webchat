const btnSend = document.querySelector('.btn-send');
const btnSave = document.querySelector('.btn-save');
const inputMsg = document.querySelector('.input-msg');
const inputName = document.querySelector('.input-name');
const chatList = document.querySelector('.chat-list');
const divChat = document.querySelector('.div-chat');
const userId = document.querySelector('#user-id');
const userList = document.querySelector('.user-list');
const socket = window.io();

btnSend.addEventListener('click', () => {
  socket.emit('newMessage', { chatMessage: inputMsg.value, nickname: userId.innerHTML });
  inputMsg.value = '';
});

btnSave.addEventListener('click', () => {
  socket.emit('changeName', inputName.value);
  inputName.value = '';
});

const createNewMessage = (username, text, time) => {
  const divMsg = document.createElement('div');
  divMsg.className = 'msg';
  divMsg.setAttribute('data-testid', 'message');
  divMsg.innerHTML = `${username} - ${time} - ${text}`;
  chatList.appendChild(divMsg);
};

const createUser = (array, userid) => {
  const otherUsers = array.filter(({ id }) => id !== userid);
  userList.innerHTML = '';
  otherUsers.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerHTML = item.userName;
    userList.appendChild(li);
  });
};

const setUserName = (data) => {
  const currentUser = data.filter((user) => user.id === socket.id);
  userId.innerHTML = currentUser[0].userName;
  userId.className = currentUser[0].id;
};

const newUser = (id, nickname) => {
  userId.innerHTML = nickname;
  userId.className = id;
};

socket.on('newUser', ({ id, userName }) => {
  newUser(id, userName);
});

socket.on('message', ({ username, text, time }) => {
  createNewMessage(username, text, time);
  divChat.scrollTop = divChat.scrollHeight;
});

socket.on('newName', (data) => setUserName(data));

socket.on('allUsers', (userArray) => createUser(userArray, socket.id));

socket.on('userExit', (naoSei) => console.log(naoSei));

const msgEventEnter = () => {
  inputMsg.addEventListener('keyup', ({ keyCode }) => {
    if (keyCode === 13) {
      btnSend.click();
    }
  });
  inputName.addEventListener('keyup', ({ keyCode }) => {
    if (keyCode === 13) {
      btnSave.click();
    }
  });
};

msgEventEnter();

module.exports = socket;