const showChat = async (req, res) => {
  res.render(`${__dirname}/../views/chat.ejs`);
};

module.exports = {
  showChat,
};