import { randomUUID } from "crypto";
import BaseEntity from "../Base/base-entity";

export interface ITodo {
    todoId?: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

class Todo extends BaseEntity {
    todoId: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;

    constructor({
        todoId,
        userId,
        title,
        description,
        completed = false,
    }: ITodo) {
        super();
        this.todoId = todoId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    /**
     * create todo object from json
     * @param {object} todoObj
     * @returns Todo
     */
    static fromJson({
        todoId,
        userId,
        title,
        description,
        completed,
        createdAt,
        updatedAt,
    }: ITodo) {
        const todo = new Todo({
            todoId,
            userId,
            title,
            description,
            completed,
        });

        if (createdAt) {
            todo.setCreatedAt(createdAt);
        }

        if (updatedAt) {
            todo.setUpdatedAt(updatedAt);
        }

        return todo;
    }

    /**
     * create todo to database
     * @param {object} todoObj
     * @returns Todo
     */
    static create({ userId, title, description, completed }: ITodo) {
        return new Todo({
            todoId: randomUUID(),
            userId,
            title,
            description,
            completed,
        });
    }
}

export default Todo;
