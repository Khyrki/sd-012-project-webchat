const RenderBaseController = require('./Base/RenderBaseController');

class RootController {
  constructor(router, viewsMap) {
    this.router = router;
    this.viewsMap = viewsMap;
  }

  execute() {
    this.router.get('/', new RenderBaseController(this.viewsMap.chat).handle);
  }
}

module.exports = RootController;
