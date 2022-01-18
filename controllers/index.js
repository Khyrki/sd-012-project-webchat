const { Router } = require('express');
const { findAll, create } = require('../models/messages');

const router = Router({ mergeParams: true });

router.get('/webchat', async (_req, res) => {
  try {
    const result = await findAll();
    return res.status(200).json(result);    
  } catch (error) {
    return error.message;
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    return res.status(200).json(result);    
  } catch (error) {
    return error.message;
  }
});

module.exports = router;