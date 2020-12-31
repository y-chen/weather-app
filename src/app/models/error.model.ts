import { HttpErrorResponse } from '@angular/common/http';

export class ServerError extends Error {
	constructor(error: HttpErrorResponse) {
		super(error.message);
	}
}

export class BadRequestError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}

export class NotFoundError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}

export class UnauthorizedError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}

export class ForbiddenError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}

export class ConflictError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}

export class InternalServerError extends ServerError {
	constructor(error: any) {
		super(error);
	}
}
