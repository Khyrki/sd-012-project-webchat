const webChat = async (req, res) => {
    res.status(200).render('webChat/index');
};

module.exports = {
    webChat,
};