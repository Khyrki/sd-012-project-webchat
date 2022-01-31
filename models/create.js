const connection = require('./connection');

module.exports = async (obj, collection) => {
    try {
        const created = await (await connection()).collection(collection)
          .insertOne(obj);
        return created;
    } catch (err) {
        return err;
    }
};