const connection = require('../connection');

module.exports = async () => {
    const messageObjects = await (await connection())
    .collection('messages')
    .find().toArray();
    const messageStrings = messageObjects.reduce((array, currMsg) => 
    [...array, `${currMsg.date} - ${currMsg.nickname} ${currMsg.chatMessage}`], []);
    return messageStrings.sort();
};