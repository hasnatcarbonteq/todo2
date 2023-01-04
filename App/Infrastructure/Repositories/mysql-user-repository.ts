import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { Option, Some, None } from "oxide.ts";
import { prismaNotFoundErrorHandler } from "@infrastructure/Utils/prisma-error-handler";
import User from "@domain/Entities/User/user";
import IUserRepository from "@domain/Entities/User/IUser-repository";

@injectable()
class MysqlUserRepository implements IUserRepository {
    private prismaClient: PrismaClient;

    constructor(@inject("PrismaClient") prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async add(userEntity): Promise<Option<User>> {
        try {
            const user = await this.prismaClient.user.create({
                data: userEntity.toObj(),
            });
            return Some(User.fromJson(user));
        } catch (error) {
            return prismaNotFoundErrorHandler(error);
        }
    }

    async fetchByEmail(email: string): Promise<Option<User>> {
        try {
            const result = await this.prismaClient.user.findFirst({
                where: { email },
            });
            if (!result) {
                return None;
            }
            return Some(User.fromJson(result));
        } catch (e) {
            console.log(e);
            return prismaNotFoundErrorHandler(e);
        }
    }

    async fetchById(userId: string): Promise<Option<User>> {
        try {
            const result = await this.prismaClient.user.findFirst({
                where: { userId },
            });
            if (!result) {
                return None;
            }
            return Some(User.fromJson(result));
        } catch (e) {
            return prismaNotFoundErrorHandler(e);
        }
    }

    async update(userEntity) {
        await this.prismaClient.user.update({
            where: { userId: userEntity.userId },
            data: userEntity.toObj(),
        });
        return true;
    }

    async remove(userId) {
        await this.prismaClient.user.delete({
            where: { userId },
        });
        return true;
    }
}

export default MysqlUserRepository;
