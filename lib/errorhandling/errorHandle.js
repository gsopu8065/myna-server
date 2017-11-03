'use strict'

//noinspection JSAnnotator
module.exports = class ValidationError extends Error {
    constructor(message, status) {
        //noinspection JSAnnotator,JSAnnotator
        super();
        this.message = getValidationMessage(message);
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

function getValidationMessage(details) {
    if (typeof details === 'string') {
        return details;
    }    
    else if (Array.isArray(details) && details.length > 0 && details[0].message != null) {
        return details[0].message;
    }
    else if (details != null && details.message != null) {
        return details.message;
    }

    return 'Validation error';
}
