const model = require('../models');

module.exports = async (_req, res) => {
  const messages = await model.getMessages();
  res.render(`${__dirname}/../views/index.ejs`, { messages });
};
