const { saveMessage } = require('../models/modelSaveMessage');

const dateAndTime = () => {
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} `;
    const time = `${now.getHours()}:${now.getMinutes()}`;
    return `${date} ${time}`;
};

const controllerNewMessageUser = ({ nickname, chatMessage }) => {
    const date = dateAndTime();
    const messageSaved = saveMessage(nickname, chatMessage, date);
    // const returnMessage = `${dateAndTime()} - ${nickname}: ${chatMessage}`;
    return messageSaved;
};

module.exports = { controllerNewMessageUser };