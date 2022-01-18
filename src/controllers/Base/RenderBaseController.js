class RenderBaseController {
  constructor(view) {
    this.view = view;
    this.handle = this.handle.bind(this);
  }

  handle(_req, res) {
    res.render(this.view);
  }
}

module.exports = RenderBaseController;
