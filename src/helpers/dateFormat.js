const dateFormat = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const splitedDate = date.split(' ');
  const formatedDate = `
  ${splitedDate[2]}-${months.indexOf(splitedDate[1])}-${splitedDate[3]} ${splitedDate[4]}
  `;

  return formatedDate;
};

module.exports = dateFormat;