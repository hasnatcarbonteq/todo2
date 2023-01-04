import PaginationOptions from "@infrastructure/Utils/pagination-options";

class GetAllTodoDTO {
    private paginationOptions: PaginationOptions;

    constructor(request) {
        const { perPage, currentPage } = request.query;
        this.paginationOptions = new PaginationOptions(currentPage, perPage);
    }

    getPaginationOptions = (): PaginationOptions => this.paginationOptions;
}

export default GetAllTodoDTO;
