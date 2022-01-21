const chatController = (_req, res) => {
  res.status(200).render('chat');
};

module.exports = { chatController };