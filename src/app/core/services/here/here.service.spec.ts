/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { anyObject, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { Param } from '@wa/app/models/http.model';

import { ApiService } from '../api/api.service';
import { HereService } from './here.service';

describe('HereService', () => {
	let spectator: SpectatorService<HereService>;

	let apiMock: MockProxy<ApiService>;

	const createService = createServiceFactory(HereService);

	let testData: TestData;

	beforeEach(() => {
		const {
			apiServiceMock,

			apiServiceProvider,
			configServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockConfig().mockSettings();

		apiMock = apiServiceMock;

		spectator = createService({
			providers: [apiServiceProvider, configServiceProvider, settingsServiceProvider],
		});

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(apiMock);
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('locationLookup', () => {
		it('should call findLocationById, not findLocationByCoords or findLocationByQuery when param id has value', async () => {
			apiMock.get.mockResolvedValue(location);

			testData.hereSearchParams.coord = null;
			testData.hereSearchParams.query = null;

			await spectator.service.locationLookup(testData.hereSearchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/revgeocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByCoords, not findLocationById or findLocationByQuery when param coord has value', async () => {
			apiMock.get.mockResolvedValue([testData.hereLocation]);

			testData.hereSearchParams.id = null;
			testData.hereSearchParams.query = null;

			await spectator.service.locationLookup(testData.hereSearchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/revgeocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByQuery, not findLocationById or findLocationByCoords when param query has value', async () => {
			apiMock.get.mockResolvedValue(testData.hereLocation);

			testData.hereSearchParams.id = null;
			testData.hereSearchParams.coord = null;

			await spectator.service.locationLookup(testData.hereSearchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/revGeocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('findCities', () => {
		it('should format query and call ApiService.get with expected arguments', async () => {
			const { hereLocation, hereSearchParams } = testData;
			const partialParams: Param[] = [
				{ key: 'q', value: hereSearchParams.query.replace(' ', '+') },
				{ key: 'limit', value: 5 },
			];

			apiMock.get.mockResolvedValue([hereLocation]);

			await spectator.service.findCities(hereSearchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/autocomplete'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationById', () => {
		it('should format id and call ApiService.get with expected arguments', async () => {
			const { hereLocation, hereSearchParams } = testData;
			const partialParams = [{ key: 'id', value: hereSearchParams.id }];

			apiMock.get.mockResolvedValue(hereLocation);

			await spectator.service.findLocationById(hereSearchParams.id);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/lookup'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationByCoords', () => {
		it('should format coords and call ApiService.get with expected arguments', async () => {
			const { hereLocation, hereSearchParams } = testData;
			const { lat, lon } = hereSearchParams.coord;
			const partialParams = [{ key: 'at', value: `${lat},${lon}` }];

			apiMock.get.mockResolvedValue(hereLocation);

			await spectator.service.findLocationByCoords(hereSearchParams.coord);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/revgeocode'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationByQuery', () => {
		it('should format query and call ApiService.get with expected arguments', async () => {
			const { hereLocation, hereSearchParams } = testData;
			const partialParams = [{ key: 'q', value: hereSearchParams.query.replace(' ', '+') }];

			apiMock.get.mockResolvedValue(hereLocation);

			await spectator.service.findLocationByQuery(hereSearchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/geocode'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});
});
