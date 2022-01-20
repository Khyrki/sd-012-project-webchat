class Session {
  constructor() {
    this.list = [];
  }

  addUser(user) {
    this.list.push(user);
  }

  getUserList() {
    return this.list.map(({ nick }) => nick);
  }

  changeName(oldName, newName) {
    const position = this.list.map(({ nick }) => nick).indexOf(oldName);
    this.list[position].nick = newName;
  }

  removeUser(userId) {
    this.list = this.list.filter(({ id }) => userId !== id);
  }
}

module.exports = Session;
