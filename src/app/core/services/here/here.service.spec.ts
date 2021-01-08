/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { anyObject, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { HereService } from '@wa/app/core/services/here/here.service';
import { getHereServiceMocks, HereServiceMocks } from '@wa/app/core/services/here/here.service.spec.mocks';
import { Param } from '@wa/app/models/http.model';

import { ApiService } from '../api/api.service';

describe('HereService', () => {
	let spectator: SpectatorService<HereService>;

	let apiMock: MockProxy<ApiService>;

	const createService = createServiceFactory(HereService);

	let mocks: HereServiceMocks;

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

		mocks = getHereServiceMocks();
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

			mocks.searchParams.coord = null;
			mocks.searchParams.query = null;

			await spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/revgeocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByCoords, not findLocationById or findLocationByQuery when param coord has value', async () => {
			apiMock.get.mockResolvedValue([location]);

			mocks.searchParams.id = null;
			mocks.searchParams.query = null;

			await spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/revgeocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByQuery, not findLocationById or findLocationByCoords when param query has value', async () => {
			apiMock.get.mockResolvedValue(location);

			mocks.searchParams.id = null;
			mocks.searchParams.coord = null;

			await spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, expect.toEndWith('/geocode'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/lookup'), anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(expect.toEndWith('/revGeocode'), anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('findCities', () => {
		it('should format query and call ApiService.get with expected arguments', async () => {
			const { location, searchParams } = mocks;
			const partialParams: Param[] = [
				{ key: 'q', value: searchParams.query.replace(' ', '+') },
				{ key: 'limit', value: 5 },
			];

			apiMock.get.mockResolvedValue([location]);

			await spectator.service.findCities(searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/autocomplete'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationById', () => {
		it('should format id and call ApiService.get with expected arguments', async () => {
			const { location, searchParams } = mocks;
			const partialParams = [{ key: 'id', value: searchParams.id }];

			apiMock.get.mockResolvedValue(location);

			await spectator.service.findLocationById(searchParams.id);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/lookup'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationByCoords', () => {
		it('should format coords and call ApiService.get with expected arguments', async () => {
			const { location, searchParams } = mocks;
			const { lat, lon } = searchParams.coord;
			const partialParams = [{ key: 'at', value: `${lat},${lon}` }];

			apiMock.get.mockResolvedValue(location);

			await spectator.service.findLocationByCoords(searchParams.coord);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/revgeocode'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});

	describe('findLocationByQuery', () => {
		it('should format query and call ApiService.get with expected arguments', async () => {
			const { location, searchParams } = mocks;
			const partialParams = [{ key: 'q', value: searchParams.query.replace(' ', '+') }];

			apiMock.get.mockResolvedValue(location);

			await spectator.service.findLocationByQuery(searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('/geocode'), {
				params: expect.arrayContaining(partialParams),
			});
		});
	});
});
