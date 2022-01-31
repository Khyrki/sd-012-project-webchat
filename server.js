require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('Alguém se conectou!');
});

const { PORT } = process.env;

app.use(cors());

app.get('/', (_req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
