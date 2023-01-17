import logger from "@infrastructure/Logger";
import HttpStatusCodes from "@application/Utils/http-status-codes";
import HttpException from "@infrastructure/Errors/HttpException";
import ValidationException from "@infrastructure/Errors/ValidationException";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const handleError = async (error, req, res) => {
    logger.error(error);

    if (error instanceof HttpException) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: error.message,
        });
    }

    if (error instanceof ValidationException) {
        return res.status(HttpStatusCodes.BAD_REQUEST).send({
            status: "validation error",
            message: error.message,
        });
    }

    if (error instanceof PrismaClientKnownRequestError) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "something went wrong",
        });
    }

    return res
        .status(
            error.status && typeof error.status === "number"
                ? error.status
                : 500
        )
        .send({
            status: "error",
            message: error.message || "unknown error",
        });
};

export default handleError;
