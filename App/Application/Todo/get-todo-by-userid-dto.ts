class GetTodoByUserIdDto {
    private userId: string;

    constructor(request) {
        const { userId } = request.params;
        this.userId = userId;
    }

    getUserId(): string {
        return this.userId;
    }
}

export default GetTodoByUserIdDto;
