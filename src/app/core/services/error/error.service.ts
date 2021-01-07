import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { ExtendedError, HereError, OpenWeatherMapError } from '@wa/app/models/error.model';
import { Header } from '@wa/app/models/http.model';

@Injectable()
export class ErrorService {
	constructor(private readonly loggerService: LoggerService, private readonly notificationService: NotificationService) {}

	handleError(error: ExtendedError): void {
		let message: string;
		let stackTrace: string;
		console.log(error.rejection);

		if (error.rejection instanceof HttpErrorResponse) {
			// Server Error

			message = this.getServerMessage(error.rejection);
			stackTrace = this.getServerStack(error.rejection);
		} else {
			// Client Error

			message = this.getClientMessage(error);
			stackTrace = this.getClientStack(error);
		}

		this.notificationService.showError(message);
		this.loggerService.error(message, stackTrace);
	}

	private getClientMessage(error: Error): string {
		if (!navigator.onLine) {
			return 'No Internet Connection';
		}

		return error.message || error.toString();
	}

	private getClientStack(error: Error): string {
		return error.stack;
	}

	private getServerMessage(error: HttpErrorResponse): string {
		if (this.isHereError(error.error)) {
			return (error.error as HereError).error_description;
		}

		if (this.isOpenWeatherMapError(error.error)) {
			return (error.error as OpenWeatherMapError).message;
		}

		return 'Unexpected error';
	}

	private getServerStack(e: HttpErrorResponse): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { status, statusText, error, message, url, headers } = e;
		const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));

		return `
status: ${status}
statusText: ${statusText}
error: ${JSON.stringify(error)}
message: ${message}
url: ${url}
headers: ${JSON.stringify(mappedHeaders)}
    `;
	}

	private isHereError(error: any): boolean {
		return 'error' in error && 'error_description' in error;
	}

	private isOpenWeatherMapError(error: any): boolean {
		return 'cod' in error && 'message' in error;
	}
}
