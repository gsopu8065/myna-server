'use strict'

//noinspection JSAnnotator
module.exports = class ValidationError extends Error {
    constructor(message, status) {
        //noinspection JSAnnotator,JSAnnotator
        super();
        this.message = message;
        this.name = this.constructor.name;
        this.status = status || 400;
    }

    get statusCode() {
        return this.status;
    }

    set statusCode(value) {
        this.status = value;
    }
};

