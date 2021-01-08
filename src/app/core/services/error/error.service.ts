/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { ExtendedError, HereError, OpenWeatherMapError } from '@wa/app/models/error.model';
import { Header } from '@wa/app/models/http.model';

import { SlackService } from '../slack/slack.service';

@Injectable()
export class ErrorService {
	constructor(
		private readonly loggerService: LoggerService,
		private readonly notificationService: NotificationService,
		private readonly slackService: SlackService,
	) {}

	async handleError(error: ExtendedError): Promise<void> {
		let message: string;
		let stackTrace: string;

		if (error.rejection instanceof HttpErrorResponse) {
			// Server Error

			message = this.getServerMessage(error.rejection);
			stackTrace = this.getServerStack(error.rejection);
		} else {
			// Client Error

			message = this.getClientMessage(error);
			stackTrace = this.getClientStack(error);
		}

		this.loggerService.error(message, stackTrace);
		this.notificationService.showError(message);
		await this.slackService.send(error, 'error');
	}

	private getClientMessage(error: Error): string {
		return error.message || JSON.stringify(error);
	}

	private getClientStack(error: Error): string {
		return error.stack;
	}

	private getServerMessage(e: HttpErrorResponse): string {
		const error = e.error;
		let message: string;

		if (this.isHereError(error)) {
			message = (error as HereError).error_description;
		}

		if (this.isOpenWeatherMapError(error)) {
			message = (error as OpenWeatherMapError).message;
		}

		return message || JSON.stringify(error);
	}

	private getServerStack(e: HttpErrorResponse): string {
		const { status, statusText, error, message, url, headers } = e;
		const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));

		return JSON.stringify({ status, statusText, error, message, url, headers: mappedHeaders });
	}

	private isHereError(error: any): boolean {
		return 'error' in error && 'error_description' in error;
	}

	private isOpenWeatherMapError(error: any): boolean {
		return 'cod' in error && 'message' in error;
	}
}
