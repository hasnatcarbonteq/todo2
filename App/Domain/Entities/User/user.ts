import { randomUUID } from "crypto";
import BaseEntity from "../Base/base-entity";

export interface IUser {
    userId?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends BaseEntity {
    userId: string;
    username: string;
    email: string;
    password: string;

    constructor({ userId, username, email, password }: IUser) {
        super();
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * create user object from json
     * @param {object} userObj
     * @returns User
     */
    static fromJson({
        userId,
        username,
        email,
        password,
        createdAt,
        updatedAt,
    }: IUser) {
        const user = new User({ userId, username, email, password });
        if (createdAt) {
            user.setCreatedAt(createdAt);
        }

        if (updatedAt) {
            user.setUpdatedAt(updatedAt);
        }
        return user;
    }

    /**
     * create user to database
     * @param {object} userObj
     * @returns User
     */
    static create({ username, email, password }: IUser) {
        return new User({ userId: randomUUID(), username, email, password });
    }
}

export default User;
