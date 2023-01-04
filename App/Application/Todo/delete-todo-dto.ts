class DeleteTodoDTO {
    private todoId: string;

    constructor(request) {
        this.todoId = request.params.todoId;
    }

    getTodoId(): string {
        return this.todoId;
    }
}

export default DeleteTodoDTO;
