const { saveMessage, controllerGetMessageAll } = require('../models/modelSaveMessage');

const dateAndTime = () => {
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} `;
    const time = `${now.getHours()}:${now.getMinutes()}`;
    return `${date} ${time}`;
};

const controllerNewMessageUser = async ({ nickname, chatMessage }) => {
    const timestamp = dateAndTime();
    const messageSaved = await saveMessage(nickname, chatMessage, timestamp);
    return messageSaved;
};

const getAllMessages = async () => {
    const allMessages = await controllerGetMessageAll();
    return allMessages;
};

module.exports = { controllerNewMessageUser, getAllMessages };