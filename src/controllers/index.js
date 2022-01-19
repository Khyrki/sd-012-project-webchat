const RenderBaseController = require('./Base/RenderBaseController');

class RootController {
  constructor(app, views) {
    this.app = app;
    this.views = views;
  }

  execute() {
    this.app.get('/', new RenderBaseController(this.views.home).handle);
  }
}

module.exports = RootController;
