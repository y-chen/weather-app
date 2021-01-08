import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { SlackService } from '@wa/app/core/services/slack/slack.service';
import { ErrorStack, ExtendedError } from '@wa/app/models/error.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(
		private readonly errorService: ErrorService,
		private readonly notificationService: NotificationService,
		private readonly loggerService: LoggerService,
		private readonly router: Router,
		private readonly slackService: SlackService,
	) {}

	async handleError(error: ExtendedError): Promise<void> {
		let message: string;
		let stackTrace: string | ErrorStack;
		let status: number;

		if (error.rejection instanceof HttpErrorResponse) {
			// Server Error

			message = this.errorService.getServerMessage(error.rejection);
			stackTrace = this.errorService.getServerStack(error.rejection);
			status = stackTrace.status;
		} else {
			// Client Error

			message = this.errorService.getClientMessage(error);
			stackTrace = this.errorService.getClientStack(error);
		}

		this.loggerService.error(message, stackTrace);
		this.notificationService.showError(message);
		// await this.slackService.sendError({ stackTrace, error });
		await this.navigateToErroPage(status);
	}

	private async navigateToErroPage(status?: number): Promise<void> {
		if (status) {
			await this.router.navigate(['/error', status]);
		}
	}
}
