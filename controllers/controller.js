const start = async (req, res) => {
    await res.status(200).render('chat');
};

module.exports = { start }; 