import "reflect-metadata";
import LoginUserDTO from "@application/User/login-user-dto";
import RegisterUserDTO from "@application/User/register-user-dto";
import GoogleOAuth2RedirectDTO from "@application/User/google-oauth2-redirect-dto";
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

    googleLoginUrl = async (request) => {
        const response = await userService.googleLoginUrl();
        return {
            body: { status: "success", data: response },
        };
    };

    googleOauthCallback = async (request) => {
        const googleOAuth2RedirectDTO = new GoogleOAuth2RedirectDTO(request);
        const response = await userService.googleOauthCallback(
            googleOAuth2RedirectDTO
        );
        return {
            body: { status: "success", data: response },
        };
    };
}

export default UserController;
