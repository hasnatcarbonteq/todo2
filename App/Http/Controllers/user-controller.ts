import "reflect-metadata";
import container from "@infrastructure/DIContainer/container";
import UserService from "@application/User/user-service";

import LoginUserDTO from "@application/User/login-user-dto";
import RegisterUserDTO from "@application/User/register-user-dto";
import GoogleOAuth2RedirectDTO from "@application/User/google-oauth2-redirect-dto";
import AuthValidation from "@application/Validations/AuthValidation";

const userService = container.resolve(UserService);

class UserController {
    login = async (request) => {
        const errors = AuthValidation.login(request);
        if (errors) return errors;
        const loginUserDTO = new LoginUserDTO(request);
        return await userService.login(loginUserDTO);
    };

    register = async (request) => {
        const errors = AuthValidation.register(request);
        if (errors) return errors;
        const registerUserDTO = new RegisterUserDTO(request);
        return await userService.register(registerUserDTO);
    };

    googleLoginUrl = async (request) => {
        return await userService.googleLoginUrl();
    };

    googleOauthCallback = async (request) => {
        const googleOAuth2RedirectDTO = new GoogleOAuth2RedirectDTO(request);
        const response = await userService.googleOauthCallback(
            googleOAuth2RedirectDTO
        );
        return response;
    };
}

export default UserController;
