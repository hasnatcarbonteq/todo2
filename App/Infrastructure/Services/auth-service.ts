import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
const { compare: comparePassword } = bcrypt;
import config from "../Config";
const { server } = config;

@injectable()
class AuthService {
    async verifyPassword(password, encryptedPassword) {
        try {
            return await comparePassword(password, encryptedPassword);
        } catch (err) {
            throw new Error(err);
        }
    }

    async signJWT(props) {
        try {
            return await jwt.sign(props, server.SECRET, { expiresIn: "7d" });
        } catch (err) {
            throw new Error(err);
        }
    }

    async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            return hashedPassword;
        } catch (err) {
            throw new Error(err);
        }
    }

    static decodeJWT(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, server.SECRET, (err, decoded) => {
                if (err) return resolve(null);
                return resolve(decoded);
            });
        });
    }
}

export default AuthService;
