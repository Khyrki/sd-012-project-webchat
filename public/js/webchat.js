const socket = window.io();

let nickname = '';
const nicknameElement = document.querySelector('.user-nickname');
const clientIdentification = document.querySelector('.client-id');

const setClientNickname = (username) => {
  nicknameElement.innerText = username;
  clientIdentification.innerText = username;
  nickname = username;
};

