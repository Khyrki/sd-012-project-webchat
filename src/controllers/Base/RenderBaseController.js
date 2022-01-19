class RenderBaseController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.handle = this.handle.bind(this);
  }

  async handle(_req, res) {
    const messages = await this.model.find();
    res.render(this.view, { messages });
  }
}

module.exports = RenderBaseController;
