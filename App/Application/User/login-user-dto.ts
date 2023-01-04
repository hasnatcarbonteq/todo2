class LoginUserDTO {
    private email: string;
    private password: string;

    constructor(request) {
        const { email, password } = request.body;
        this.email = email;
        this.password = password;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}

export default LoginUserDTO;
