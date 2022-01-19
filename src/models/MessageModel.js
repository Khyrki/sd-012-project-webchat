const Model = require('./base/Model');

class MessageModel extends Model {
  constructor() {
    super('messages');
  }

  async create(messageString) {
    const separeTimestamp = messageString.split(' - ');
    const separeNickAndMessage = separeTimestamp[1].split(': ');

    const message = separeNickAndMessage[1];
    const nickname = separeNickAndMessage[0];
    const timestamp = separeTimestamp[0];

    return super.create({
      message,
      nickname,
      timestamp,
    });
  }

  async find() {
    return (await super.find()).map(({ message, nickname, timestamp }) => (
      `${timestamp} - ${nickname}: ${message}`
    ));
  }
}

module.exports = MessageModel;
