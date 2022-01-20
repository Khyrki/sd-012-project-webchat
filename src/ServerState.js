class ServerState {
  constructor() {
    this.data = {
      users: [],
    };
  }

  get users() {
    return this.data.users;
  }

  set user({ id, nickname }) {
    if (this.data.users.every(({ id: userId }) => id !== userId)) {
      this.data.users.push({ id, nickname });
    }
  }

  updateUser({ nickname, id }) {
    const userIndex = this.data.users.findIndex(({ id: userId }) => id === userId);
    this.data.users[userIndex] = { id, nickname };
  }

  deleteUser(id) {
    this.data.users = this.data.users.filter(({ id: userId }) => id !== userId);
  }
}

module.exports = ServerState;
