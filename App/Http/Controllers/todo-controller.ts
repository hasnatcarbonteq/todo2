import "reflect-metadata";
import { injectable } from "tsyringe";
import container from "@infrastructure/DIContainer/container";
import TodoService from "@application/Todo/todo-service";

import CreateTodoDTO from "@application/Todo/create-todo-dto";
import GetTodoByIdDto from "@application/Todo/get-todo-by-id-dto";
import UpdateTodoDTO from "@application/Todo/update-todo-dto";
import DeleteTodoDTO from "@application/Todo/delete-todo-dto";
import GetTodoByUserIdDTO from "@application/Todo/get-todo-by-userid-dto";
import GetAllTodoDTO from "@application/Todo/get-all-todo-dto";

const todoService = container.resolve(TodoService);

@injectable()
class TodoController {
    create = async (request) => {
        const createTodoDTO = new CreateTodoDTO(request);
        const response = await todoService.create(createTodoDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    getById = async (request) => {
        const getTodoByIdDTO = new GetTodoByIdDto(request);
        const response = await todoService.getById(getTodoByIdDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    update = async (request) => {
        const updateTodoDTO = new UpdateTodoDTO(request);
        const response = await todoService.update(updateTodoDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    delete = async (request) => {
        const deleteTodoDTO = new DeleteTodoDTO(request);
        const response = await todoService.delete(deleteTodoDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    getByUserId = async (request) => {
        const getTodoByUserIdDTO = new GetTodoByUserIdDTO(request);
        const response = await todoService.getByUserId(getTodoByUserIdDTO);
        return {
            body: { status: "success", data: response },
        };
    };

    getAll = async (request) => {
        const getAllTodoDTO = new GetAllTodoDTO(request);
        const response = await todoService.getAll(getAllTodoDTO);
        return {
            body: { status: "success", data: response },
        };
    };
}

export default TodoController;
