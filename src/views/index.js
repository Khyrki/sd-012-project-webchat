class Views {
  constructor() {
    this.home = 'home';
  }

  get map() {
    return {
      home: this.home,
    };
  }
}

module.exports = Views;
