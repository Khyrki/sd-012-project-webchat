const socket = window.io();

let nickname = '';
const nicknameElement = document.querySelector('.user-nickname');
const clientIdentification = document.querySelector('.client-id');

const setClientNickname = (username) => {
  nicknameElement.innerText = username;
  clientIdentification.innerText = username;
  nickname = username;
};

const nicknameForm = document.querySelector('.form-nickname');
const inputNickname = document.querySelector('.input-nickname');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = inputNickname.value;
  if (newNickname) {
    setClientNickname(newNickname);
    socket.emit('updateNickname', newNickname);
    inputNickname.value = '';
  }
  return false;
});

