import AuthService from './auth';

describe("AuthService", () => {
    describe("login", () => {
        it("should throw an error when email doesn't exist", async () => {
            await expect(AuthService.login({email:"admin2@admin.com"})).rejects.toThrowError("Incorrect email or password!");
        });

        it("should throw an error when password is incorrect", async () => {
            await expect(AuthService.login({email:"admin@admin.com", password:"wrong"})).rejects.toThrowError("Incorrect email or password!");
        });

        it("should return a user", async () => {
            await expect(AuthService.login({email:"admin@admin.com", password:"admin"})).resolves.toHaveProperty('id');
        });
    });
});