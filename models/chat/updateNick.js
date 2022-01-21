const connection = require('../connection');

const create = async (nickName, newNickName) => (await connection())
.collection('messages').updateOne({ nickName }, { $set: { newNickName } });

module.exports = create;
