const express = require('express');

const { create, remove, searchAll } = require('../messages');

const router = express.Router({ mergeParams: true });

router.get('/', searchAll);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;
