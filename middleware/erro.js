module.exports = (err, req, res, _next) => {
  console.error(err.message);
  res.status(500).end();
};
