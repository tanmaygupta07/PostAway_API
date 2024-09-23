//custome error handler for the application
export class ApplicationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}