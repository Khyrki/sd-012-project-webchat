const express = require('express');
const message = require('./getHistory');
const renderPage = require('./renderPage');

const router = express.Router({ mergeParams: true });

router.get('/', renderPage);
router.get('/', message);

module.exports = router;
