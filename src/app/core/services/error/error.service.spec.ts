/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { HttpErrorResponse } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { ErrorServiceMocks, getErrorServiceMocks } from '@wa/app/core/services/error/error.service.spec.mocks';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { ErrorStack } from '@wa/app/models/error.model';
import { Header } from '@wa/app/models/http.model';

describe('ErrorService', () => {
	let spectator: SpectatorService<ErrorService>;
	let loggerMock: MockProxy<LoggerService>;
	let notificationMock: MockProxy<NotificationService>;

	const createService = createServiceFactory(ErrorService);

	let mocks: ErrorServiceMocks;

	beforeEach(() => {
		const { loggerServiceMock, notificationServiceMock, loggerServiceProvider, notificationServiceProvider } = new MasterMock();

		loggerMock = loggerServiceMock;
		notificationMock = notificationServiceMock;

		spectator = createService({
			providers: [loggerServiceProvider, notificationServiceProvider],
		});

		mocks = getErrorServiceMocks();
	});

	afterEach(() => {
		mockReset(loggerMock);
		mockReset(notificationMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('handleError', () => {
		it('should parse HereError and call LoggerService.error and NotificationService.showError with expected arguments', () => {
			const { e, init, hereError } = mocks;
			e.rejection = new HttpErrorResponse({ error: hereError, ...init });
			const { status, statusText, error, message, url, headers } = e.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			spectator.service.handleError(e);

			expect(loggerMock.error).toHaveBeenCalledWith(hereError.error_description, JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(hereError.error_description);
		});

		it('should parse OpenWeatherMapError and call LoggerService.error and NotificationService.showError with expected arguments', () => {
			const { e, init, openWeatherMapError } = mocks;
			e.rejection = new HttpErrorResponse({ error: openWeatherMapError, ...init });
			const { status, statusText, error, message, url, headers } = e.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			spectator.service.handleError(e);

			expect(loggerMock.error).toHaveBeenCalledWith(openWeatherMapError.message, JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(openWeatherMapError.message);
		});

		it('should stringify ExtendedError.rejection.error if error is not HereError or OpenWeatherMapError', () => {
			const { e, init } = mocks;
			const unexpectedError = { error: 'ERROR' };
			e.rejection = new HttpErrorResponse({ error: unexpectedError, ...init });
			const { status, statusText, error, message, url, headers } = e.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const stack: ErrorStack = { status, statusText, error, message, url, headers: mappedHeaders };

			spectator.service.handleError(e);

			expect(loggerMock.error).toHaveBeenCalledWith(JSON.stringify(unexpectedError), JSON.stringify(stack));
			expect(notificationMock.showError).toHaveBeenCalledWith(JSON.stringify(unexpectedError));
		});

		it('should call LoggerService.error and NotificationService.showError with expected arguments when a client error has been passed', () => {
			const { e } = mocks;
			const { message, stack } = e;

			spectator.service.handleError(e);

			expect(loggerMock.error).toHaveBeenCalledWith(message, stack);
			expect(notificationMock.showError).toHaveBeenCalledWith(message);
		});

		it('should stringify ExtendedError if  is a client error without ExtendedError.message value', () => {
			const { e } = mocks;
			e.message = null;
			const messageAlternative = JSON.stringify(e);

			spectator.service.handleError(e);

			expect(loggerMock.error).toHaveBeenCalledWith(messageAlternative, e.stack);
			expect(notificationMock.showError).toHaveBeenCalledWith(messageAlternative);
		});
	});
});
