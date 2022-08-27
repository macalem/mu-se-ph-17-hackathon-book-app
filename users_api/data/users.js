import ROLES from './roles.js';

export default [
    {
        id: "1",
        name: "Admin",
        email: "admin@admin.com",
        password: "$2b$10$pkXR.i7D8WMrXKDGaEA7YeKZwoazot0KoM6APtSI2D1.8mUY0Jnh2",
        roles: [ROLES.Admin, ROLES.User]
    },
    {
        id: "2",
        name: "Visitor 1",
        email: "visitor1@gmail.com",
        password: "12312",
        roles: [ROLES.User]
    },
    {
        id: "3",
        name: "Visitor 2",
        email: "visitor2@gmail.com",
        password: "12312",
        roles: [ROLES.User]
    }
]