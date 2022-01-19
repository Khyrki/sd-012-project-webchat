const RenderBaseController = require('./Base/RenderBaseController');

class RootController {
  constructor(app, views, models) {
    this.app = app;
    this.views = views;
    this.models = models;
  }

  execute() {
    const renderBaseController = new RenderBaseController(this.views.home, this.models.message);

    this.app.get('/', renderBaseController.handle);
  }
}

module.exports = RootController;
