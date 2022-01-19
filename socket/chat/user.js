const generateRandomNickname = () => {
  const randomNick = Array.from(Array(16), 
    () => Math.floor(Math.random() * 36).toString(36)).join('');
  return randomNick;
};

module.exports = (io, socket, changeNickName, participants) => {
  const nickname = generateRandomNickname();
  participants.push({ id: socket.id, nickName: nickname });
  socket.emit('nickName', nickname);
  socket.on('changeNick', (newNick) => {
    changeNickName(socket.id, newNick);
    io.emit('participantChange', participants);
  });
};