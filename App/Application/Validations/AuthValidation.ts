import HttpStatusCodes from "@application/Utils/http-status-codes";
import ValidationException from "@infrastructure/Errors/ValidationException";
import validator from "validator";

export default class AuthValidation {
    static register = (request) => {
        const errors = [];

        if (validator.isEmpty(request.body.email)) {
            errors.push("Email is required");
        }

        if (validator.isEmpty(request.body.password)) {
            errors.push("Password is required");
        }

        if (validator.isEmpty(request.body.username)) {
            errors.push("Username is required");
        }

        if (!validator.isStrongPassword(request.body.password)) {
            errors.push("Password is too weak");
        }

        if (!validator.isEmail(request.body.email)) {
            errors.push("Email is invalid");
        }

        if (errors.length > 0) {
            return new ValidationException(HttpStatusCodes.BAD_REQUEST, errors);
        }

        return null;
    };

    static login = (request) => {
        const errors = [];

        if (validator.isEmpty(request.body.email)) {
            errors.push("Email is required");
        }

        if (validator.isEmpty(request.body.password)) {
            errors.push("Password is required");
        }

        if (!validator.isEmail(request.body.email)) {
            errors.push("Email is invalid");
        }

        if (errors.length > 0) {
            return new ValidationException(400, errors);
        }

        return null;
    };
}
