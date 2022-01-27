require('dotenv').config();

const httpServer = require('./api/socket');

const { PORT = 3000 } = process.env;

httpServer.listen(PORT, () => { console.log(`Listening on port: ${PORT}`); });
