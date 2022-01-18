const allMessages = async (req, res) => {
  res.status(200).render('chat');
};

module.exports = { allMessages };
