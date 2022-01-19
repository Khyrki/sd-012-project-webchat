const getAllMessagesFunction = require('./getAllMessages');
const createMessageFunction = require('./createMessage');

module.exports = {
    getAllMessages: () => getAllMessagesFunction(),
    createMessage: (message) => createMessageFunction(message),
};