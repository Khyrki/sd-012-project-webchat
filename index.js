const http = require('http');

module.exports = (app) => {
  const PORT = 3000;
  const httpServer = http.createServer(app);

  return {
    http: httpServer,
    init: () => httpServer.listen(PORT, () => console.log(`Listen on port ${PORT}.`)),
  };
};