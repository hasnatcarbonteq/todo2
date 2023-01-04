import { injectable, inject } from "tsyringe";
import HttpError from "@infrastructure/Errors/HttpException";
import ITodoRepository from "@domain/Entities/Todo/ITodo-repository";

import CreateTodoDTO from "./create-todo-dto";
import GetTodoByIdDTO from "./get-todo-by-id-dto";
import UpdateTodoDTO from "./update-todo-dto";
import DeleteTodoDTO from "./delete-todo-dto";
import GetTodoByUserIdDTO from "./get-todo-by-userid-dto";
import GetAllTodoDTO from "./get-all-todo-dto";

@injectable()
class TodoService {
    constructor(
        @inject("ITodoRepository") private todoRepository: ITodoRepository
    ) {}

    create = async (createTodoDTO: CreateTodoDTO) => {
        const savedTodo = await this.todoRepository.add(
            createTodoDTO.getTodo()
        );
        return savedTodo.unwrap();
    };

    getById = async (getTodoByIdDTO: GetTodoByIdDTO) => {
        const todoResult = await this.todoRepository.fetchById(
            getTodoByIdDTO.getTodoId()
        );
        if (todoResult.isNone()) throw new HttpError(404, "Todo not found");
        return todoResult.unwrap();
    };

    update = async (updateTodoDTO: UpdateTodoDTO) => {
        const todoResult = await this.todoRepository.fetchById(
            updateTodoDTO.getTodo().todoId
        );
        if (todoResult.isNone()) throw new HttpError(404, "Todo not found");

        const todo = todoResult.unwrap();
        todo.title = updateTodoDTO.getTodo().title;
        todo.description = updateTodoDTO.getTodo().description;
        todo.completed = updateTodoDTO.getTodo().completed;

        const savedTodo = await this.todoRepository.update(todo);
        return savedTodo;
    };

    delete = async (deleteTodoDTO: DeleteTodoDTO) => {
        const todoResult = await this.todoRepository.fetchById(
            deleteTodoDTO.getTodoId()
        );
        if (todoResult.isNone()) throw new HttpError(404, "Todo not found");

        const result = await this.todoRepository.remove(
            deleteTodoDTO.getTodoId()
        );
        return result;
    };

    getByUserId = async (getTodoByUserIdDTO: GetTodoByUserIdDTO) => {
        const todos = await this.todoRepository.fetchByUserId(
            getTodoByUserIdDTO.getUserId()
        );
        return todos.unwrap();
    };

    getAll = async (getAllTodoDTO: GetAllTodoDTO) => {
        const todos = await this.todoRepository.fetchAll({
            paginationOptions: getAllTodoDTO.getPaginationOptions(),
        });
        return todos;
    };
}

export default TodoService;
