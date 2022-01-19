const formatDate = (date) => {
  const formattedDate = date.replace(/\//g, '-');
  return formattedDate;
};

module.exports = {
  formatDate,
};