/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { anyObject, mock, MockProxy, mockReset } from 'jest-mock-extended';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { ApiServiceMocks, getApiServiceMocks } from '@wa/app/core/services/api/api.service.spec.mocks';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { KeyValuePair } from '@wa/app/models/http.model';

describe('ApiService', () => {
	let spectator: SpectatorService<ApiService>;
	let httpMock: MockProxy<HttpClient>;
	let loggerServiceMock: MockProxy<LoggerService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createService = createServiceFactory(ApiService);

	let mocks: ApiServiceMocks;

	beforeEach(() => {
		httpMock = mock<HttpClient>();
		loggerServiceMock = mock<LoggerService>();
		settingsServiceMock = mock<SettingsService>();

		spectator = createService({
			providers: [
				{ provide: HttpClient, useValue: httpMock },
				{ provide: LoggerService, useValue: loggerServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		mocks = getApiServiceMocks();
		const { culture, result } = mocks;

		httpMock.get.mockReturnValue(result);
		httpMock.post.mockReturnValue(result);
		httpMock.put.mockReturnValue(result);
		httpMock.patch.mockReturnValue(result);
		httpMock.delete.mockReturnValue(result);
		settingsServiceMock.getCulture.mockReturnValue(culture);
	});

	afterEach(() => {
		mockReset(httpMock);
		mockReset(loggerServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	describe('get', () => {
		it('should call HttpClient.get with expected arguments', async () => {
			const url = mocks.url;

			await spectator.service.get(url);

			expect(httpMock.get).toHaveBeenCalledWith(url, anyObject());
		});
	});

	describe('post', () => {
		it('should call HttpClient.post with expected arguments', async () => {
			const { body, url } = mocks;

			await spectator.service.post(url, body);

			expect(httpMock.post).toHaveBeenCalledWith(url, body, anyObject());
		});
	});

	describe('put', () => {
		it('should call HttpClient.put with expected arguments', async () => {
			const { body, url } = mocks;

			await spectator.service.put(url, body);

			expect(httpMock.put).toHaveBeenCalledWith(url, body, anyObject());
		});
	});

	describe('delete', () => {
		it('should call HttpClient.delete with expected arguments', async () => {
			const url = mocks.url;

			await spectator.service.delete(url);

			expect(httpMock.delete).toHaveBeenCalledWith(url, anyObject());
		});
	});

	describe('patch', () => {
		it('should call HttpClient.patch with expected arguments', async () => {
			const { body, url } = mocks;

			await spectator.service.patch(url, body);

			expect(httpMock.patch).toHaveBeenCalledWith(url, body, anyObject());
		});
	});
});
