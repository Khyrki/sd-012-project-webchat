module.exports = (req, res, next) => {
  try {
    return res.status(200).render('chatPage');
  } catch (error) {
    next(error);
  }
};