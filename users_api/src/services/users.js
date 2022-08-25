import users from "../../data/users.js";

const getAllUsers = () => users;

const getUserByID = (id) => users.find((user) => user.id === id);

export default { getAllUsers, getUserByID };
