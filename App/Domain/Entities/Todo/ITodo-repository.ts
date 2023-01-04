import { Option } from "oxide.ts";
import Todo from "./Todo";
import BaseRepository from "../Base/Ibase-repository";

export default interface ITodoRepository extends BaseRepository<Todo> {
    fetchByUserId(userId: string): Promise<Option<Todo[]>>;
}
