const { getAll } = require('../models/message/messagesModel');
const random = require('../helpers/random');

const getAllMsg = async (req, res) => {
  try {
    const messages = await getAll();
  
    res.status(200).render('client', { messages, nickname: random(16) });   
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllMsg,
};
