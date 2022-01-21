const getAllModel = require('../models/chat/getall');

module.exports = async (_req, res) => {
  try {
    const messages = await getAllModel();
    res.status(200).render('webchat', { messages });
  } catch (err) {
    console.log(err);
  }
};