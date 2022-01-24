const { findAll } = require('../models/chatModel');

async function renderChat(_req, res) {
  const msgs = await findAll();
  return res.status(200).render('chatView', { msgs });
}

module.exports = { renderChat };