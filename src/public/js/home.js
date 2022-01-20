const htmlEvents = {
  click: 'click',
};

const socketEvents = {
  user: 'user',
  users: 'users',
  message: 'message',
};

const elements = {
  nameContainer: document.getElementById('online-user'),
  messagesContainer: document.getElementById('messages'),
  messageInput: document.getElementById('message-box'),
  nicknameInput: document.getElementById('nickname-box'),
  sendButton: document.getElementById('send-button'),
  nicknameButton: document.getElementById('nickname-button'),
  onlineUsersContainer: document.getElementById('ul-online-users'),
};

// storage;
const getNickname = () => sessionStorage.getItem('nickname');
const setNickname = (nickname) => sessionStorage.setItem('nickname', nickname);

// handlers;
const changeNicknameHandler = (nickname) => {
  elements.nameContainer.innerText = nickname;
};

const createMessageHandler = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  elements.messagesContainer.appendChild(li);
};

const sendMessageHandler = (socket) => {
  const message = elements.messageInput.value;

  socket(message, getNickname());

  elements.messageInput.value = '';
  elements.messageInput.focus();
};

const sendNicknameHandler = (socket) => {
  const nickname = elements.nicknameInput.value;
  socket(nickname);

  elements.nicknameInput.value = '';
  elements.nicknameInput.focus();
};

const createUserHandler = (nickname) => {
  const userLi = document.createElement('li');
  userLi.innerText = nickname;
  userLi.setAttribute('data-testid', 'online-user');
  elements.onlineUsersContainer.appendChild(userLi);
};

const createOnlineUsersHandler = (users, id) => {
  elements.onlineUsersContainer.innerHTML = '';
  const currentUser = users.find(({ id: userId }) => id === userId);
  createUserHandler(currentUser.nickname);
  const otherUsers = users.filter((user) => user.id !== id);
  otherUsers.forEach((user) => createUserHandler(user.nickname));
};

// sockets;
const sendUser = (socket, event) => (nickname) => {
  socket.emit(
    event,
    { nickname },
  );
};

const getSocket = (socket, event) => (callback) => {
  socket.on(event, (data) => {
    callback(data);
  });
};

const sendMessageSocket = (socket, event) => (message, nickname) => {
  socket.emit(
    event,
    { chatMessage: message, nickname },
  );
};

const getSockets = (socket, events) => ({
  sendUser: sendUser(socket, events.user),
  getUser: getSocket(socket, events.user),
  sendMessage: sendMessageSocket(socket, events.message),
  getMessage: getSocket(socket, events.message),
  getUsers: getSocket(socket, events.users),
});

// events;
const createSocketEvent = (element, event, handler, socket) => {
  element.addEventListener(event, (e) => {
    e.preventDefault();
    handler(socket);
  });
};

// === MAIN === //
function main() {
  const socket = window.io();
  const sockets = getSockets(socket, socketEvents);

  sockets.getUser((nickname) => { setNickname(nickname); changeNicknameHandler(nickname); });
  sockets.getUsers((users) => createOnlineUsersHandler(users, socket.id)); 
  sockets.getMessage(createMessageHandler);
  createSocketEvent(
    elements.sendButton,
    htmlEvents.click,
    sendMessageHandler,
    sockets.sendMessage,
  );
  createSocketEvent(
    elements.nicknameButton,
    htmlEvents.click,
    sendNicknameHandler,
    sockets.sendUser,
  );

  window.onbeforeunload = () => { socket.disconnect(); };
}

main();
