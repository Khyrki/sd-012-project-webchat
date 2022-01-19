const { io } = require('socket.io-client');

const statusCode = require('http-status-codes').StatusCodes;

const socket = io('http://localhost:3000');

const chatController = (req, res, next) => {
  try {
    const { nickname, chatMessage } = req.body;
    socket.emit('message', { nickname, chatMessage });

    res.status(statusCode.OK).end();
  } catch (err) {
    next(err);
  }
};

const chatIDE = (_req, res, next) => {
  try {
    res.status(statusCode.OK).render(`${__dirname}/index.html`);
  } catch (err) {
    next(err);
  }
};

module.exports = (route) => {
  route.get('/', chatIDE);
  route.post('/', chatController);
};