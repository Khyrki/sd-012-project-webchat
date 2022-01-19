const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

const chatController = (req, res) => {
  try {
    const { nickname, chatMessage } = req.body;
    socket.emit('message', { nickname, chatMessage });

    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

module.exports = (route) => {
  route.post('/', chatController);
};