import PaginatedData from "@infrastructure/Utils/paginated-data";
import User from "./User";
import PaginationOptions from "@infrastructure/Utils/pagination-options";
import BaseRepository from "../Base/Ibase-repository";
import { Option } from "oxide.ts";

type fetchByQueryOptions = {
    paginationOptions: PaginationOptions;
    query: string;
};
export default interface IUserRepository extends BaseRepository<User> {
    fetchByQuery?({
        paginationOptions,
        query,
    }: fetchByQueryOptions): Promise<PaginatedData<User[]>>;

    fetchByEmail(email: string): Promise<Option<User>>;

}
