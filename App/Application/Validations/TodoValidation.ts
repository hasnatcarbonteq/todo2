import HttpStatusCodes from "@application/Utils/http-status-codes";
import ValidationException from "@infrastructure/Errors/ValidationException";
import validator from "validator";

export default class TodoValidation {
    static create = (request) => {
        const errors = [];

        if (validator.isEmpty(request.body.title)) {
            errors.push("Title is required");
        }

        if (validator.isEmpty(request.body.description)) {
            errors.push("Description is required");
        }

        if (validator.isEmpty(request.body.userId)) {
            errors.push("User Id is required");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };

    static update = (request) => {
        const errors = [];

        if (validator.isEmpty(request.body.todoId)) {
            errors.push("Todo Id is required");
        }

        if (validator.isEmpty(request.body.title)) {
            errors.push("Title is required");
        }

        if (validator.isEmpty(request.body.description)) {
            errors.push("Description is required");
        }

        if (validator.isEmpty(request.body.userId)) {
            errors.push("User Id is required");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };

    static getAll = (request) => {
        const errors = [];

        if (validator.isEmpty(request.query.perPage)) {
            errors.push("Per Page is required");
        }

        if (validator.isEmpty(request.query.currentPage)) {
            errors.push("Current Page is required");
        }

        if (
            validator.isInt(request.query.currentPage, {
                lt: 1,
            })
        ) {
            errors.push("Current Page is invalid");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };

    static getById = (request) => {
        const errors = [];

        if (validator.isEmpty(request.params.todoId)) {
            errors.push("Todo Id is required");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };

    static getByUserId = (request) => {
        const errors = [];

        if (validator.isEmpty(request.params.userId)) {
            errors.push("User Id is required");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };
}
