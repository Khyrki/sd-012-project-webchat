const util = require('../util/helper');

module.exports = (socket, sessionStore, next) => {
  socket.emit('users', sessionStore.findAllSessions());
  let sessionId = socket.handshake.auth.session;
  if (sessionId) {
    const session = sessionStore.findSession(sessionId);
    if (session) return next();
  }
  sessionId = util.generateId();
  const userId = util.generateId();
  sessionStore.saveSession(sessionId, { userId, nickname: userId });
  socket.emit('session', { sessionId, nickname: userId });
  socket.emit('users', sessionStore.findAllSessions());
  socket.broadcast.emit('newUser', sessionStore.findAllSessions());
  socket.on('disconnect', async () => {
    sessionStore.deleteSession(sessionId);
    socket.broadcast.emit('disconnected', sessionStore.findAllSessions());
  });
  next();
};
