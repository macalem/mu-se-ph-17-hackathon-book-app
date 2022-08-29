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
        name: "Ako Si Reader",
        email: "reader@test.com",
        password: "$2b$10$JQ4gyPF6RJPp45aapgkwneXdNqvJEhM8e.2vyZlr.bjvJA3f/mf66",
        roles: [ROLES.User]
    },
    {
        id: "3",
        name: "Im Author",
        email: "author@test.com",
        password: "$2b$10$QiWaALY5yJAGYTVce0UPmeMhKyQJqnxOiEsRQ7jy5GL7RIo.1HCIO",
        roles: [ROLES.User]
    }
]