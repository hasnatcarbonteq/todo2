import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import AuthService from "../../Services/auth-service";

class PrismaSeeder {
    prisma: PrismaClient;
    authService: AuthService;
    constructor() {
        this.prisma = new PrismaClient();
        this.authService = new AuthService();
        this.seed();
    }

    async seed() {
        await this.prisma.$connect();
        await this.createUsers();
        await this.createTodos();
        await this.prisma.$disconnect();
    }

    async createUsers() {
        const fakeUsers = Array.from({ length: 2 }, () => this.fakeUser());
        const users = await Promise.all(fakeUsers);
        await this.prisma.user.createMany({
            data: users,
        });
    }

    async createTodos() {
        const users = await this.prisma.user.findMany();
        const fakeTodos = users.map((user) =>
            Array.from({ length: 10 }, () => this.fakeTodo(user.userId))
        );
        const todos = await Promise.all(fakeTodos.flat());
        await this.prisma.todo.createMany({
            data: todos,
        });
    }

    async fakeUser() {
        const password = await this.authService.hashPassword("asdF1234!");
        return {
            userId: faker.datatype.uuid(),
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password,
        };
    }

    async fakeTodo(userId: string) {
        return {
            todoId: faker.datatype.uuid(),
            userId,
            title: faker.lorem.words(5),
            description: faker.lorem.sentence(10),
            completed: faker.datatype.boolean(),
        };
    }
}

export default new PrismaSeeder();
