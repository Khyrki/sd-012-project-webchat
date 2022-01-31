let userArray = [];

const newUser = (userId, nickname) => {
  const user = {
    id: userId,
    userName: nickname,
  };

  userArray.push(user);

  return user;
};

const removeUser = (socketId) => {
  userArray = userArray.filter((item) => item.id !== socketId);
};

const changeName = ({ name, id }) => {
  const updatedUser = { id, userName: name };

  userArray = userArray.map((user) => ((user.id === id) 
    ? updatedUser
    : user));
  
  return userArray;
};

const allUsers = () => userArray;

module.exports = {
  newUser,
  removeUser,
  changeName,
  allUsers,
};