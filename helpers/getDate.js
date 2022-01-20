module.exports = () => {
    // Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    const newDate = new Intl.DateTimeFormat('pt-br',
        { dateStyle: 'short', timeStyle: 'medium' }).format(new Date());
    return newDate.replace(/\//g, '-');
};