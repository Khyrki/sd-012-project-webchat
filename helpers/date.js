const dataFunc = (date) => {
  const mo = new Intl.DateTimeFormat('pt-br', { 
    dateStyle: 'short', 
    hour12: 'true', 
    timeStyle: 'medium',
  }).format(date);
  const correctDate = mo.split('/').join('-');
  return correctDate;
};

module.exports = { dataFunc };
