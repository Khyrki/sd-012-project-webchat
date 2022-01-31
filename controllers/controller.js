const { getAll } = require('../models');

const start = async (req, res) => {
    const messages = await getAll();
    res.status(200).render('chat', { messages });
};

module.exports = { start }; 