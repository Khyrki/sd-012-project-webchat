const DBModel = require('./DBModel');

class MessageModel extends DBModel {
  constructor() {
    super('messages');
  }

  async insertMessage(message, nickname, timestamp) {
    await this.insertOne({ message, nickname, timestamp });
  }
}

module.exports = MessageModel;