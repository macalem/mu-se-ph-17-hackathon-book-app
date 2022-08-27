import hash from "../utils/hashPassword.js";

import users from "../../data/users.js";

const login = async ({ email, password }) => {
  const user = users.find((user) => user.email === email);

  if (!user) throw new Error("Incorrect email or password!");

  if (!(await hash.comparePassword(password, user.password)))
    throw new Error("Incorrect email or password!");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };
};

export default { login };
