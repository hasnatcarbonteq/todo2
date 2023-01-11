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
import TodoValidation from "@application/Validations/TodoValidation";

const todoService = container.resolve(TodoService);

@injectable()
class TodoController {
    create = async (request) => {
        const errors = TodoValidation.create(request);
        if (errors) return errors;
        const createTodoDTO = new CreateTodoDTO(request);
        return await todoService.create(createTodoDTO);
    };

    getById = async (request) => {
        const errors = TodoValidation.getById(request);
        if (errors) return errors;
        const getTodoByIdDTO = new GetTodoByIdDto(request);
        return await todoService.getById(getTodoByIdDTO);
    };

    update = async (request) => {
        const errors = TodoValidation.update(request);
        if (errors) return errors;
        const updateTodoDTO = new UpdateTodoDTO(request);
        return await todoService.update(updateTodoDTO);
    };

    delete = async (request) => {
        const errors = TodoValidation.getById(request);
        if (errors) return errors;
        const deleteTodoDTO = new DeleteTodoDTO(request);
        return await todoService.delete(deleteTodoDTO);
    };

    getByUserId = async (request) => {
        const errors = TodoValidation.getByUserId(request);
        if (errors) return errors;
        const getTodoByUserIdDTO = new GetTodoByUserIdDTO(request);
        return await todoService.getByUserId(getTodoByUserIdDTO);
    };

    getAll = async (request) => {
        const errors = TodoValidation.getAll(request);
        if (errors) return errors;
        const getAllTodoDTO = new GetAllTodoDTO(request);
        return await todoService.getAll(getAllTodoDTO);
    };
}

export default TodoController;
