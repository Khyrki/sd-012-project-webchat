const socket = require('./src/api/socket');

const SOCKET_PORT = process.env.PORT || 3000;

socket.listen(SOCKET_PORT, () => console.log(`Server running on PORT ${SOCKET_PORT}`));
