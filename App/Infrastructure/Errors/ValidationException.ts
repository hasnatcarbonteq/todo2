class ValidationException extends Error {
    public status: number;

    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
    }
}

export default ValidationException;
