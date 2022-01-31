const connection = require('./connection');

module.exports = async (collection) => {
    try {
        const rows = (await connection()).collection(collection).find().toArray();
        return rows;
    } catch (err) {
        return (err);
    }
};