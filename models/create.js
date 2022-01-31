const connection = require('./connection');

module.exports = async (obj) => {
    try {
        const { _insertedId } = await (await connection()).collection('webchat')
          .insertOne(obj);
        return _insertedId;
    } catch (err) {
        return err;
    }
};