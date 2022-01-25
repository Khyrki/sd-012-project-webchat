module.exports = (io, socket, sessionStore) => {
  socket.on('changeNickname', async (nickname, sessionId) => {
    const session = sessionStore.findSession(sessionId);
    sessionStore.saveSession(sessionId.toString(), { userId: session.userId, nickname });
    io.emit('users', sessionStore.findAllSessions());
  });
};
