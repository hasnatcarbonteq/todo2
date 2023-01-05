import { injectable, inject } from "tsyringe";
import LoginUserDTO from "./login-user-dto";
import RegisterUserDTO from "./register-user-dto";
import GoogleOAuth2RedirectDTO from "./google-oauth2-redirect-dto";
import IUserRepository from "@domain/Entities/User/IUser-repository";
import HttpError from "@infrastructure/Errors/HttpException";
import AuthService from "@infrastructure/Services/auth-service";
import GoogleOAuthService from "@infrastructure/Services/google-oauth-service";

@injectable()
class UserService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        private authService: AuthService,
        private googleOAuthService: GoogleOAuthService
    ) {}

    register = async (registerUserDTO: RegisterUserDTO) => {
        const userResult = await this.userRepository.fetchByEmail(
            registerUserDTO.getUser().email
        );
        if (!userResult.isNone())
            throw new HttpError(400, "Email already exists");

        const hash = await this.authService.hashPassword(
            registerUserDTO.getUser().password
        );

        registerUserDTO.getUser().password = hash;

        const savedUser = await this.userRepository.add(
            registerUserDTO.getUser()
        );
        return savedUser.unwrap();
    };

    login = async (loginUserDTO: LoginUserDTO) => {
        const userResult = await this.userRepository.fetchByEmail(
            loginUserDTO.getEmail()
        );

        if (userResult.isNone()) {
            throw new HttpError(400, "Invalid email or password");
        }
        const user = userResult.unwrap();
        const isValid = await this.authService.verifyPassword(
            loginUserDTO.getPassword(),
            user.password
        );
        if (!isValid) {
            throw new HttpError(400, "Invalid email or password");
        }

        const token = await this.authService.signJWT({
            id: user.userId,
            email: user.email,
        });

        return { user, token };
    };

    googleLoginUrl = async () => {
        return await this.googleOAuthService.getAuthUrl();
    };

    googleOauthCallback = async (
        googleOAuth2RedirectDTO: GoogleOAuth2RedirectDTO
    ) => {
        const { access_token } = await this.googleOAuthService.getAccessToken(
            googleOAuth2RedirectDTO.getCode()
        );

        const userInfo = await this.googleOAuthService.getUserInfo();
        const { email, name, picture } = userInfo;

        const userResult = await this.userRepository.fetchByEmail(email);
        if (userResult.isNone()) {
            
        } else {
            const user = userResult.unwrap();
            const token = await this.authService.signJWT({
                id: user.userId,
                email: user.email,
            });
            return { user, token };
        }
    };
}

export default UserService;
