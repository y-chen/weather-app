/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { anyObject, MockProxy, mockReset } from 'jest-mock-extended';

import { HttpClient } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { ApiServiceMocks, getApiServiceMocks } from '@wa/app/core/services/api/api.service.spec.mocks';

describe('ApiService', () => {
	let spectator: SpectatorService<ApiService>;

	let httpMock: MockProxy<HttpClient>;

	const createService = createServiceFactory(ApiService);

	let mocks: ApiServiceMocks;

	beforeEach(() => {
		const { httpClientMock, httpClientProvider, settingsServiceProvider } = new MasterMock().mockSettings().mockHttpClient();

		httpMock = httpClientMock;

		spectator = createService({
			providers: [httpClientProvider, settingsServiceProvider],
		});

		mocks = getApiServiceMocks();
	});

	afterEach(() => {
		mockReset(httpMock);
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
