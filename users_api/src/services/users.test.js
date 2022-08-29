import UserService from './users';
import userData from '../../data/users';

describe("UserService", () => {

    describe("getAllUsers", () => {
        it("should return the list of users", () => {
            expect(UserService.getAllUsers()).toEqual(userData);
        });
    });

    describe("getUserByID", () => {
        it("should throw an error when user ID was not provided", () => {
            expect(() => UserService.getUserByID()).toThrowError("Missing required parameter");
        });

        it("should return undefined if user doesn't exist", () => {
            expect(UserService.getUserByID(3)).toBeUndefined();
        });

        it("should return specific user when user ID is provided", () => {
            expect(UserService.getUserByID("1")).toEqual(userData[0]);
        });
    });

    describe("createUser", () => {
        let testData = [
            {
                name: "Name",
                params: {
                    email: "name@test.com",
                    password: "test"
                },
                errMsg: "Missing required parameters"
            },
            {
                name: "Password",
                params: {
                    name: "Test",
                    email: "name@test.com"
                },
                errMsg: "Missing required parameters"
            },
            {
                name: "Email",
                params: {
                    password: "test",
                    email: "name@test.com"
                },
                errMsg: "Missing required parameters"
            }
        ]
        testData.map(test => {
            it(`should throw an error when ${test.name} param was not provided`, async () => {
                await expect(UserService.createUser(test.params)).rejects.toThrowError(test.errMsg);
            });
        });

        it("should throw an error when user already exists", async () => {
            await expect(UserService.createUser({
                email: "admin@admin.com",
                password: "test",
                name: "Admin"
            })).rejects.toThrowError("User already exists");
        });

        it("should return a user", async () => {
            await expect(UserService.createUser({
                email: "unit@test.com",
                password: "unit",
                name: "Test"
            })).resolves.toHaveProperty('id');
        });
    });
});