const connection = require('./connection');

module.exports = async (obj, collection) => {
    try {
        const { _insertedId } = await (await connection()).collection(collection)
          .insertOne(obj);
        return _insertedId;
    } catch (err) {
        return err;
    }
};