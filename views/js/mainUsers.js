const formNickname = document.querySelector('#nickname');
const ulNickname = document.querySelector('#nicknameList');
const input = document.querySelector('#nicknameInput');

formNickname.addEventListener('submit', (event) => {
  sessionStorage.setItem('name', input.value);
  event.preventDefault();
  input.value = '';
  const nickname = sessionStorage.getItem('name');
  const li = document.createElement('li');
  li.innerText = nickname;
  ulNickname.appendChild(li);
  if (sessionStorage.getItem('name')) {
      formNickname.value = sessionStorage.getItem('name');
    }
});
