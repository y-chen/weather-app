import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
	getClientMessage(error: Error): string {
		if (!navigator.onLine) {
			return 'No Internet Connection';
		}

		return error.message ? error.message : error.toString();
	}

	getClientStack(error: Error): string {
		return error.stack;
	}

	getServerMessage(error: HttpErrorResponse | Error): string {
		return error.message;
	}

	getServerStack(error: HttpErrorResponse | Error): string {
		// handle stack trace
		return 'stack';
	}
}
