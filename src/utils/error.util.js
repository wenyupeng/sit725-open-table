class ErrorResponse extends Error {
    constructor(message, statusCode = 400) {
        super(message)
        this.message = message;
        this.name = "Error";
        this.statusCode = statusCode
    }
}

class ValidationError extends ErrorResponse {
    constructor(message) {
        super(message)
        this.statusCode = 400;
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

module.exports = {
    ValidationError,
    NotFoundError
};