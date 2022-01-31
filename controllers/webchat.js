module.exports = async (_req, res) => {
  try {
    return res.render('webchat');
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};