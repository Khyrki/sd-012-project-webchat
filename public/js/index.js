const socket = window.io();

sessionStorage.removeItem('user');

const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user));
const getUser = () => JSON.parse(sessionStorage.getItem('user'));

const user = getUser() || { id: '', nickname: '' };

const createNewLi = ({ id, text, testId, fatherId }) => {
  const listElement = document.getElementById(fatherId);

  const li = document.createElement('li');
  const liText = document.createTextNode(text);

  li.setAttribute('id', id);
  li.setAttribute('data-testid', testId);
  
  li.appendChild(liText);
  listElement.appendChild(li);
};

const changeNickname = ({ id, nickname }) => {
  const nicknameLi = document.getElementById(id);
  nicknameLi.innerText = nickname;
};

const userLogout = (id) => {
  document.getElementById(id).remove();
};

const formSendMessage = document.querySelector('.form-send-message');
formSendMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const messageInput = event.target.firstElementChild;
  const chatMessage = messageInput.value;
  const nickname = user.nickname || getUser().nickname;

  socket.emit('message', { chatMessage, nickname });

  messageInput.value = '';
});

const formChangeNickname = document.querySelector('.form-change-nickname');
formChangeNickname.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const nicknameInput = event.target.firstElementChild;
  const nickname = nicknameInput.value;

  user.nickname = nickname;
  changeNickname(user);

  socket.emit('changeNickname', user);

  nicknameInput.value = '';
});

socket.on('userDisconnect', userLogout);

socket.on('userConnect', (id) => {
  user.id = id;
  user.nickname = id;

  setUser({ id, nickname: id });
  createNewLi({ id, text: id, testId: 'online-user', fatherId: 'users' });
});

socket.on('changeNickname', changeNickname);

socket.on('message', (message) => {
  createNewLi({ id: user.id, text: message, testId: 'message', fatherId: 'messages' });
});
