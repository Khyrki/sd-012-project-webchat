class Views {
  constructor() {
    this.chat = 'chat';
  }

  get map() {
    return {
      chat: this.chat,
    };
  }
}

module.exports = Views;
