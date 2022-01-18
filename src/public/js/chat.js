const socket = window.io('');

let nickname = '';

socket.on('setUser', (content) => {
  nickname = content;
});

socket.on('setUsers', (users) => {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.nickname;
    li.setAttribute('data-testid', 'online-user');
    if (user.id === socket.id) return userList.prepend(li);
    userList.appendChild(li);
  });
});

socket.on('message', (message) => {
  const messageList = document.getElementById('message-list');
  const p = document.createElement('p');
  p.innerText = message;
  p.setAttribute('data-testid', 'message');
  messageList.appendChild(p);
});

const setNicknameEvent = () => {
  const nicknameInput = document.getElementById('input-nickname');
  const nicknameButton = document.getElementById('btn-nickname');

  nicknameButton.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('setNickname', nicknameInput.value);
    nickname = nicknameInput.value;
    nicknameInput.value = '';
  });
};

const setMessageEvent = () => {
  const messageInput = document.getElementById('input-message');
  const messageButton = document.getElementById('btn-message');
  messageButton.addEventListener('click', async (e) => {
    e.preventDefault();
    socket.emit('message',
      {
        chatMessage: messageInput.value,
        nickname,
    });
    messageInput.value = '';
  });
};

window.onload = () => {
  setNicknameEvent();
  setMessageEvent();
};

window.onbeforeunload = () => {
  socket.disconnect();
};
