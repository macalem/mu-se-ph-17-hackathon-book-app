import hash from "../utils/hashPassword.js";

import users from "../../data/users.js";

const getAllUsers = () => users;

const getUserByID = (id) => users.find((user) => user.id === id);

const createUser = async ({ name, email, password }) => {
  // validate params
  if (!name || !email || !password) {
    throw new Error("Missing required parameters");
  }

  // check if user exists.
  if (users.find((user) => user.email === email)) {
    throw new Error("User already exists");
  }

  const pass = await hash.hashPassword(password);

  const newUser = {
    id: parseInt(users[users.length - 1].id) + 1,
    name: name,
    email: email,
    password: pass,
    is_admin: false,
  };

  users.push(newUser);
  
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    is_admin: newUser.is_admin,
  };
};

export default { getAllUsers, getUserByID, createUser };
