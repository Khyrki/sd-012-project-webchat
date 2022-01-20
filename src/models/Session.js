class Session {
  constructor() {
    this.list = [];
    this.changeName = this.changeName.bind(this);
  }

  addUser(user) {
    this.list.push(user);
  }

  getUserList() {
    return this.list.map(({ nick }) => nick);
  }

  changeName(oldName, newName) {
    this.list = this.list.map((user) => (
      user.nick === oldName ? { ...user, nick: newName } : user
    ));
  }

  removeUser(userId) {
    this.list = this.list.filter(({ id }) => userId !== id);
  }
}

module.exports = Session;
