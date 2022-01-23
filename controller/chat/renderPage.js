module.exports = async (_req, res, next) => {
  try {
    res.render('chat');
  } catch (err) {
    next(err);
  }
};
