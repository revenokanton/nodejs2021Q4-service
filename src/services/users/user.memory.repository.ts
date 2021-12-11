import { UserInterface } from './user.model.d';

let users: UserInterface[] = [];

const findAll = () => users;

const findById = (id: string) => users.find((i) => i.id === id);

const addNewUser = (user: UserInterface) => {
  users.push(user);
};

const updateUser = (id: string, data: UserInterface) => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

const deleteUser = (id: string) => {
  const user = findById(id);
  if (user) {
    users = [...users.filter((i) => i.id !== id)];
    return user;
  }
  return null;
};

export default {
  findAll,
  findById,
  addNewUser,
  updateUser,
  deleteUser,
};
