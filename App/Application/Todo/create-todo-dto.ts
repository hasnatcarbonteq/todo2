import Todo from "@domain/Entities/Todo/Todo";

class CreateTodoDTO {
    private todo: Todo;

    constructor(request) {
        const { userId, title, description, completed } = request.body;
        this.todo = Todo.create({
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

export default CreateTodoDTO;
