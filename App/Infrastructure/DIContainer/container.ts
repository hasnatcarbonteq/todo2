import { container } from "tsyringe";

import { PrismaClient } from "@prisma/client";
import MysqlTodoRepository from "@infrastructure/Repositories/mysql-todo-repository";
import MysqlUserRepository from "@infrastructure/Repositories/mysql-user-repository";

container.register("PrismaClient", { useValue: new PrismaClient() });
container.register("IUserRepository", { useClass: MysqlUserRepository });
container.register("ITodoRepository", { useClass: MysqlTodoRepository });

export default container;
