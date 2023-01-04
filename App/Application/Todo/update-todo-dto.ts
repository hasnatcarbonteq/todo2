import Todo from "@domain/Entities/Todo/Todo";

class UpdateTodoDTO {
    private todo: Todo;

    constructor(request) {
        const { userId, todoId, title, description, completed } = request.body;
        this.todo = Todo.fromJson({
            todoId,
            userId,
            title,
            description,
            completed,
        });
    }

    getTodo(): Todo {
        return this.todo;
    }
}

export default UpdateTodoDTO;
