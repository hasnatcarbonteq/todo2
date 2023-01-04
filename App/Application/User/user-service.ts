import LoginUserDTO from "./login-user-dto";
import RegisterUserDTO from "./register-user-dto";
import IUserRepository from "@domain/Entities/User/IUser-repository";
import AuthService from "@infrastructure/Services/auth-service";
import { injectable, inject } from "tsyringe";
import HttpError from "@infrastructure/Errors/HttpException";

@injectable()
class UserService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        private authService: AuthService
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
}

export default UserService;
