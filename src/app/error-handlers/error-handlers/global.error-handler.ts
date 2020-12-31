import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	// Error handling is important and needs to be loaded first.
	// Because of this we should manually inject the services with Injector.
	constructor(
		private readonly loggerService: LoggerService,
		private readonly errorService: ErrorService,
		private readonly notificationService: NotificationService,
	) {}

	handleError(error: Error | HttpErrorResponse): void {
		let message;
		let stackTrace;

		if (error instanceof HttpErrorResponse) {
			// Server Error
			message = this.errorService.getServerMessage(error);
			stackTrace = this.errorService.getServerStack(error);
			this.notificationService.showError(message);
		} else {
			// Client Error
			message = this.errorService.getClientMessage(error);
			stackTrace = this.errorService.getClientStack(error);
			this.notificationService.showError(message);
		}

		// Always log errors
		this.loggerService.error(message, stackTrace);
	}
}