const disconnect = (list, id) => {
    list.forEach((element, index) => {
        if (element.id === id) {
        list.splice(index, 1);
        }
    });
};

module.exports = {
    disconnect,
};