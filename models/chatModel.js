const connection = require('./connection');

const saveChat = async (nickname, chatMessage, formatDate) => {
    try {
        const saveConection = await connection();
        const saveMessage = await saveConection
        .collection('messages').insertOne({
            timestamp: formatDate,
            nickname,
            message: chatMessage,    
        });
        return saveMessage;
    } catch (error) {
        console.log('Erro ao gravar dados, Log: ', error);
    }
};

const findMessages = async () => {
    try {
        const findeMessages = await connection();
        const messagensAll = await findeMessages.collection('messages').find().toArray();
        return messagensAll;
    } catch (error) {
        console.log('Error: ', error);
    }
};

module.exports = {
    saveChat,
    findMessages,
};