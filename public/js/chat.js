const socket = window.io();

const inputForm = document.querySelector('#message-box');
const buttonForm = document.querySelector('#send-button');

const buttonNickName = document.querySelector('#nickname-button');
const inputNickName = document.querySelector('#nickname-box');

const nickLists = document.querySelector('#nicksList');
const ul = document.querySelector('#messages');

const createNickName = (nick) => nick.slice(0, 16);

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  ul.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');

  li.innerHTML = user;
  li.setAttribute('data-testid', 'online-user');

  nickLists.appendChild(li);
};

// https://qastack.com.br/programming/5306680/move-an-array-element-from-one-array-position-to-another
// https://www.codegrepper.com/code-examples/javascript/change+position+of+item+in+array+javascript
// https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another

const moveNickName = (arr, from, to) => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

// https://qastack.com.br/programming/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
const clearUsers = () => {
  while (nickLists.firstChild) {
    nickLists.removeChild(nickLists.lastChild);
  }
};

buttonForm.addEventListener('click', (e) => {
e.preventDefault();

const nickname = sessionStorage.getItem('nickname');

socket.emit('message', { chatMessage: inputForm.value, nickname });

inputForm.value = '';
});

buttonNickName.addEventListener('click', (e) => {
  e.preventDefault();
  
  const old = sessionStorage.getItem('nickname');
  const newNick = inputNickName.value;
  
  sessionStorage.setItem('nickname', newNick);
  
    socket.emit('updateNick', newNick, old);

  inputNickName.value = '';
  });

socket.on('connect', () => {
  const nick = createNickName(socket.id);
  sessionStorage.setItem('nickname', nick);
  socket.emit('user', nick);
});

socket.on('usersList', (nicks) => {
  clearUsers();
  const nickname = sessionStorage.getItem('nickname');
  const index = nicks.findIndex((nick) => nick === nickname);
  const newPosition = moveNickName(nicks, index, 0);
  newPosition.forEach((nick) => createUser(nick));
});

socket.on('message', (msg) => createMessage(msg));

window.onbeforeunload = () => {
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('disconnect', nickname);
  socket.disconnect();
};
