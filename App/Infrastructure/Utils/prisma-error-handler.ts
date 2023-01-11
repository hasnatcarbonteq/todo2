import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { None } from "oxide.ts";

export const prismaNotFoundErrorHandler = (e) => {
    if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2015") {
            return None;
        }
    }
    return e;
};
