import hash from "../utils/hashPassword.js";

import users from "../../data/users.js";

const login = ({email, password}) => {
    const user = users.find(user => user.email === email);
console.log(user);
console.log(password);
    return hash.comparePassword(password, user.password);
}

export default { login };
