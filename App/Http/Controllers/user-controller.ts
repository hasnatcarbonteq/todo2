import "reflect-metadata";
import LoginUserDTO from "@application/User/login-user-dto";
import RegisterUserDTO from "@application/User/register-user-dto";
import UserService from "@application/User/user-service";
import { injectable } from "tsyringe";
import container from "@infrastructure/DIContainer/container";

const userService = container.resolve(UserService);

@injectable()
class UserController {
    login = async (request) => {
        const loginUserDTO = new LoginUserDTO(request);
        const response = await userService.login(loginUserDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    register = async (request) => {
        const registerUserDTO = new RegisterUserDTO(request);
        const response = await userService.register(registerUserDTO);
        return {
            body: { status: "success", data: response },
        };
    };
}

export default UserController;
