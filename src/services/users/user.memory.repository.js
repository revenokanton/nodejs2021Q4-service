let users = [];

const findAll = () => users;

const findById = (id) => users.find((i) => i.id === id);

const addNewUser = (user) => {
  users.push(user);
};

const updateUser = (id, data) => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

const deleteUser = (id) => {
  const user = findById(id);
  if (user) {
    users = [...users.filter((i) => i.id !== id)];
    return user;
  }
  return null;
};

module.exports = {
  findAll,
  findById,
  addNewUser,
  updateUser,
  deleteUser,
};
