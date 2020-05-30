const http = require("http");

class HttpError extends Error {
	constructor(status, message) {
		super(message || http.STATUS_CODES[status] || "Error");
		Error.captureStackTrace(this, HttpError);

		this.status = status;
		this.name = "HttpError";
	}

	toString() {
		return this.message;
	}
}

class AuthError extends Error {
	constructor(message) {
		super(message || http.STATUS_CODES[status] || "Error");
		Error.captureStackTrace(this, AuthError);

		this.name = "AuthError";
	}

	toString() {
		return this.message;
	}
}

class CategoryError extends Error {
	constructor(message) {
		super(message || http.STATUS_CODES[status] || "Error");
		Error.captureStackTrace(this, AuthError);

		this.name = "CategoryError";
	}

	toString() {
		return this.message;
	}
}

class RecordError extends Error {
	constructor(message) {
		super(message || http.STATUS_CODES[status] || "Error");
		Error.captureStackTrace(this, AuthError);

		this.name = "RecordError";
	}

	toString() {
		return this.message;
	}
}

module.exports.RecordError = RecordError;

module.exports.CategoryError = CategoryError;

module.exports.AuthError = AuthError;

module.exports.HttpError = HttpError;
