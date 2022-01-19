const MessageModel = require('./MessageModel');

class Models {
  constructor() {
    this.message = new MessageModel();
  }

  get map() {
    return {
      message: this.message,
    };
  }
}

module.exports = Models;
