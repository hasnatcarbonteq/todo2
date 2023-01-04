import User from "@domain/Entities/User/User";

class RegisterUserDTO {
    private user: User;

    constructor(request) {
        const { username, email, password } = request.body;
        this.user = User.create({ username, email, password });
    }

    getUser(): User {
        return this.user;
    }
}

export default RegisterUserDTO;
