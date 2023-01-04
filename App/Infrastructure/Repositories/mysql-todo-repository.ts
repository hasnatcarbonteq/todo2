import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { Option, Some, None } from "oxide.ts";
import { prismaNotFoundErrorHandler } from "@infrastructure/Utils/prisma-error-handler";
import Todo from "@domain/Entities/Todo/todo";
import ITodoRepository from "@domain/Entities/Todo/ITodo-repository";
import PaginationOptions from "@infrastructure/Utils/pagination-options";
import PaginatedData from "@infrastructure/Utils/paginated-data";

@injectable()
class MysqlTodoRepository implements ITodoRepository {
    private prismaClient: PrismaClient;

    constructor(@inject("PrismaClient") prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async add(userEntity): Promise<Option<Todo>> {
        try {
            const todo = await this.prismaClient.todo.create({
                data: userEntity.toObj(),
            });
            return Some(Todo.fromJson(todo));
        } catch (error) {
            return prismaNotFoundErrorHandler(error);
        }
    }

    async fetchById(todoId: string): Promise<Option<Todo>> {
        try {
            const result = await this.prismaClient.todo.findFirst({
                where: { todoId },
            });
            if (!result) {
                return None;
            }
            return Some(Todo.fromJson(result));
        } catch (e) {
            return prismaNotFoundErrorHandler(e);
        }
    }

    async fetchByUserId(userId: string): Promise<Option<Todo[]>> {
        try {
            const results = await this.prismaClient.todo.findMany({
                where: { userId },
            });
            if (!results.length) {
                return None;
            }
            const items = results.map((item) => Todo.fromJson(item));
            return Some(items);
        } catch (e) {
            return prismaNotFoundErrorHandler(e);
        }
    }

    async fetchAll({ paginationOptions, query }): Promise<PaginatedData<Todo>> {
        const total = await this.prismaClient.todo.count();
        const rawTodos = await this.prismaClient.todo.findMany({
            take: paginationOptions.limit(),
            skip: paginationOptions.offset(),
        });
        const items = rawTodos.map((item) => Todo.fromJson(item));
        return new PaginatedData(paginationOptions, total, items);
    }

    async update(todoEntity) {
        await this.prismaClient.todo.update({
            where: { todoId: todoEntity.todoId },
            data: todoEntity.toObj(),
        });
        return true;
    }

    async remove(todoId) {
        await this.prismaClient.todo.delete({
            where: { todoId },
        });
        return true;
    }
}

export default MysqlTodoRepository;
