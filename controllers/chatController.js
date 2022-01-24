const initializeChat = async (req, res) => {
    res.status(200).render('chat');
};

module.exports = { initializeChat };