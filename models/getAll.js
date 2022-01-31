const connection = require('./connection');

module.exports = async () => {
    try {
        const rows = (await connection()).collection('webchat').find().toArray();
        return rows;
    } catch (err) {
        return (err);
    }
};