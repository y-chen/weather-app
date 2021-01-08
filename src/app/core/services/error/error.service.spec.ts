/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { HttpErrorResponse } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { ErrorStack } from '@wa/app/models/error.model';
import { Header } from '@wa/app/models/http.model';

import { LoggerService } from '../logger/logger.service';
import { NotificationService } from '../notification/notification.service';
import { SlackService } from '../slack/slack.service';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
	let spectator: SpectatorService<ErrorService>;

	let loggerMock: MockProxy<LoggerService>;
	let notificationMock: MockProxy<NotificationService>;
	let slackMock: MockProxy<SlackService>;

	const createService = createServiceFactory(ErrorService);

	let testData: TestData;

	beforeEach(() => {
		const {
			loggerServiceMock,
			notificationServiceMock,
			slackServiceMock,

			loggerServiceProvider,
			notificationServiceProvider,
			slackServiceProvider,
		} = new MasterMock();

		loggerMock = loggerServiceMock;
		notificationMock = notificationServiceMock;
		slackMock = slackServiceMock;

		spectator = createService({
			providers: [loggerServiceProvider, notificationServiceProvider, slackServiceProvider],
		});

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(loggerMock);
		mockReset(notificationMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('handleError', () => {
		it('should parse HereError and call LoggerService.error, NotificationService.showError, SlackService.send with expected arguments', async () => {
			const { extendedError, initHttpErrorResponse, hereError } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: hereError, ...initHttpErrorResponse });
			const { status, statusText, error, message, url, headers } = extendedError.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			await spectator.service.handleError(extendedError);

			expect(loggerMock.error).toHaveBeenCalledWith(hereError.error_description, JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(hereError.error_description);
			expect(slackMock.sendError).toHaveBeenCalledWith(extendedError);
		});

		it('should parse OpenWeatherMapError and call LoggerService.error, NotificationService.showError, SlackService.send  with expected arguments', async () => {
			const { extendedError, initHttpErrorResponse, openWeatherMapError } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: openWeatherMapError, ...initHttpErrorResponse });
			const { status, statusText, error, message, url, headers } = extendedError.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			await spectator.service.handleError(extendedError);

			expect(loggerMock.error).toHaveBeenCalledWith(openWeatherMapError.message, JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(openWeatherMapError.message);
			expect(slackMock.sendError).toHaveBeenCalledWith(extendedError);
		});

		it('should stringify ExtendedError.rejection.error if error is not HereError or OpenWeatherMapError', async () => {
			const { extendedError, initHttpErrorResponse } = testData;
			const unexpectedError = { error: 'ERROR' };
			extendedError.rejection = new HttpErrorResponse({ error: unexpectedError, ...initHttpErrorResponse });
			const { status, statusText, error, message, url, headers } = extendedError.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			await spectator.service.handleError(extendedError);

			expect(loggerMock.error).toHaveBeenCalledWith(JSON.stringify(unexpectedError), JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(JSON.stringify(unexpectedError));
			expect(slackMock.sendError).toHaveBeenCalledWith(extendedError);
		});

		it('should call LoggerService.error, NotificationService.showError, SlackService.send  with expected arguments when a client error has been passed', async () => {
			const { extendedError } = testData;
			const { message, stack } = extendedError;

			await spectator.service.handleError(extendedError);

			expect(loggerMock.error).toHaveBeenCalledWith(message, stack);
			expect(notificationMock.showError).toHaveBeenCalledWith(message);
			expect(slackMock.sendError).toHaveBeenCalledWith(extendedError);
		});

		it('should stringify ExtendedError if is a client error without ExtendedError.message value', async () => {
			const { extendedError } = testData;
			extendedError.message = null;
			const messageAlternative = JSON.stringify(extendedError);

			await spectator.service.handleError(extendedError);

			expect(loggerMock.error).toHaveBeenCalledWith(messageAlternative, extendedError.stack);
			expect(notificationMock.showError).toHaveBeenCalledWith(messageAlternative);
			expect(slackMock.sendError).toHaveBeenCalledWith(extendedError);
		});
	});
});
