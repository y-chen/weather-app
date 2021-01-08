/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { stringify } from 'flatted';

import { HttpErrorResponse } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { Header } from '@wa/app/models/http.model';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
	let spectator: SpectatorService<ErrorService>;

	const createService = createServiceFactory(ErrorService);

	let testData: TestData;

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig().mockSettings();

		spectator = createService({
			providers: [configServiceProvider],
		});

		testData = getTestData();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getClientMessage', () => {
		it('should return Error.message when defined', () => {
			const message = spectator.service.getClientMessage(testData.extendedError);

			expect(message).toBe(testData.extendedError.message);
		});

		it('should return flatted.stringfy of the error when Error.message is undefined', () => {
			const error = testData.extendedError;
			error.message = null;

			const message = spectator.service.getClientMessage(error);

			expect(message).toEqual(stringify(error));
		});
	});

	describe('getClientStack', () => {
		it('should return Error.stack', () => {
			const stack = spectator.service.getClientStack(testData.extendedError);

			expect(stack).toBe(testData.extendedError.stack);
		});
	});

	describe('getServerMessage', () => {
		it('should return HereError.error_description when error is of that type', () => {
			const { extendedError, initHttpErrorResponse, hereError } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: hereError, ...initHttpErrorResponse });

			const message = spectator.service.getServerMessage(extendedError.rejection);

			expect(message).toBe(extendedError.rejection.error.error_description);
		});

		it('should return OpenWeatherMapError.message when error is of that type', () => {
			const { extendedError, initHttpErrorResponse, openWeatherMapError } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: openWeatherMapError, ...initHttpErrorResponse });

			const message = spectator.service.getServerMessage(extendedError.rejection);

			expect(message).toBe(extendedError.rejection.error.message);
		});

		it('should return flatted.stringfy of the error when server error is undefined', () => {
			const { extendedError, initHttpErrorResponse } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: { message: 'Error' }, ...initHttpErrorResponse });

			const message = spectator.service.getServerMessage(extendedError.rejection);

			expect(message).toEqual(stringify(extendedError.rejection.error));
		});
	});

	describe('getServerStack', () => {
		it('should parse HttpErrorResponse as expected', () => {
			const { extendedError, initHttpErrorResponse, openWeatherMapError } = testData;
			extendedError.rejection = new HttpErrorResponse({ error: openWeatherMapError, ...initHttpErrorResponse });
			const { status, statusText, error, message, url, headers } = extendedError.rejection;
			const mappedHeaders: Header[] = headers.keys().map((key: string) => ({ key, value: headers.get(key) }));
			const expectedStack = stringify({ status, statusText, error, message, url, headers: mappedHeaders });

			const stack = spectator.service.getServerStack(testData.extendedError.rejection);

			expect(stack).toEqual(expectedStack);
		});
	});
});
