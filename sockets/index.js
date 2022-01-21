// const socket = io();
// const nicknameButton = document.querySelector("#nicknameButton");
// const sendButton = document.querySelector("#sendButton");
// const messageInput = document.querySelector("#messageInput");
// const nicknameInput = document.querySelector("#nicknameInput");
// const userNameTag = document.querySelector("#onlineUser");

// userNameTag.innerText = sessionStorage.getItem("nickname");
// nicknameButton.addEventListener("click", () => {
//   sessionStorage.setItem("nickname", nicknameInput.value);
//   userNameTag.innerText = sessionStorage.getItem("nickname");
//   nicknameInput.value = "";
// });
// sendButton.addEventListener("click", () => {
//   socket.emit("message", {
//     chatMessage: messageInput.value,
//     nickname: sessionStorage.getItem("nickname"),
//   });
//   messageInput.value = "";
//   return false;
// });

// const createMessage = (message) => {
//   const ul = document.querySelector("#ulMessages");
//   const li = document.createElement("li");
//   li.innerText = message;
//   li.setAttribute("data-testid", "message");
//   ul.appendChild(li);
// };
// socket.on("randomNickname", (msg) => {
//   userNameTag.innerText = msg;
//   sessionStorage.setItem("nickname", msg);
// });
// socket.on("message", (msg) => createMessage(msg));