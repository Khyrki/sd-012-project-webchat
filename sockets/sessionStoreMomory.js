const SessionStore = require('./sessionStore');

class SessionStoreMemory extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(id);
  }

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  deleteSession(id) {
    this.sessions.delete(id);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }

  filterSessions(id) {
    const allSessions = this.findAllSessions();
    const excludeSession = this.findSession(id);
    const filteredSessions = allSessions
      .filter((session) => session.userId !== excludeSession.userId);
    return filteredSessions;
  }
}

module.exports = SessionStoreMemory;
