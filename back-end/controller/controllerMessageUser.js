const dateAndTime = () => {
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} `;
    const time = `${now.getHours()}:${now.getMinutes()}`;
    return `${date} ${time}`;
};

const controllerNewMessageUser = ({ nickname, chatMessage }) => {
    const returnMessage = `${dateAndTime()} - ${nickname}: ${chatMessage}`;
    return returnMessage;
};

module.exports = { controllerNewMessageUser };