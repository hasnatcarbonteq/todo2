import "reflect-metadata";
import { expect } from "chai";
import Sinon from "sinon";
import UserController from "@http/Controllers/user-controller";

describe("User auth", function () {
    it("should register user", async function () {
        const userController = new UserController();
        const userSpy = Sinon.spy(userController, "register");
        const request = {
            body: {
                username: "test",
                email: "test@test.com",
                password: "tesT1234!",
            },
        };
        const response = await userController.register(request);
        expect(userSpy.calledOnce).to.be.true;
        expect(response).to.be.an("object");
        expect(response).to.have.property("userId");
        expect(response).to.have.property("username");
    });

    it("should call login", async function () {
        const userController = new UserController();
        const userSpy = Sinon.spy(userController, "login");
        const request = {
            body: {
                email: "test@test.com",
                password: "tesT1234!",
            },
        };
        const response = await userController.login(request);
        expect(userSpy.calledOnce).to.be.true;
        expect(response).to.be.an("object");
        expect(response).to.have.property("user");
        expect(response).to.have.property("token");
    });
});
