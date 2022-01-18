const { Router } = require('express');
const RootController = require('../controllers');
const Views = require('../views');

const rootRouter = Router({ mergeParams: true });

const views = new Views();
const viewsMap = views.map;

const rootController = new RootController(rootRouter, viewsMap);
rootController.execute();

module.exports = rootRouter;
