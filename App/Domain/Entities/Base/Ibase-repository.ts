import PaginationOptions from "@infrastructure/Utils/pagination-options";
import PaginatedData from "@infrastructure/Utils/paginated-data";
import { Option } from "oxide.ts";

export interface CriteriaOptions {
    paginationOptions: PaginationOptions;
    query?: string;
}

export default interface BaseRepository<T> {
    add?(entity: T): Promise<Option<T>>;
    fetchById?(entityId: string, options?: any): Promise<Option<T>>;
    fetchAll?({
        paginationOptions,
        query,
    }: CriteriaOptions): Promise<PaginatedData<T>>;
    update?(entity: T): Promise<boolean>;
    remove?(entityId: string): Promise<boolean>;
}
