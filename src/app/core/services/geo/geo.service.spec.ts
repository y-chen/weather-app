import { anyObject, mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { GeoServiceMocks, getMocksData } from '@wa/app/core/services/geo/geo.service.spec.mocks';

describe('GeoService', () => {
	let spectator: SpectatorService<GeoService>;
	let apiMock: MockProxy<ApiService>;

	const createService = createServiceFactory({
		service: GeoService,
		mocks: [ApiService],
	});

	let mocks: GeoServiceMocks;

	beforeEach(() => {
		apiMock = mock<ApiService>();

		mockReset(apiMock);

		spectator = createService({
			providers: [{ provide: ApiService, useValue: apiMock }],
		});

		mocks = { ...getMocksData() };
	});

	it('should be defined', () => {
		void expect(spectator.service).toBeDefined();
	});

	describe('locationLookup', () => {
		it('should call findLocationById, not findLocationByCoords or findLocationByQuery when param id has value', () => {
			apiMock.get.mockResolvedValue(location);

			mocks.searchParams.coord = null;
			mocks.searchParams.query = null;

			void spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, mocks.lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.revGeocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.geocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByCoords, not findLocationById or findLocationByQuery when param coord has value', () => {
			apiMock.get.mockResolvedValue([location]);

			mocks.searchParams.id = null;
			mocks.searchParams.query = null;

			void spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, mocks.revGeocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.geocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByQuery, not findLocationById or findLocationByCoords when param query has value', () => {
			apiMock.get.mockResolvedValue(location);

			mocks.searchParams.id = null;
			mocks.searchParams.coord = null;

			void spectator.service.locationLookup(mocks.searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, mocks.geocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(mocks.revGeocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('findCities', () => {
		it('should format query and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue([location]);

			mocks.options.params.unshift({ key: 'q', value: mocks.searchParams.query.replace(' ', '+') }, { key: 'limit', value: 20 });

			void spectator.service.findCities(mocks.searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(mocks.autocompleteUrl, mocks.options);
		});
	});

	describe('findLocationById', () => {
		it('should format id and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(location);

			mocks.options.params.unshift({ key: 'id', value: mocks.searchParams.id });

			void spectator.service.findLocationById(mocks.searchParams.id);

			expect(apiMock.get).toHaveBeenCalledWith(mocks.lookupUrl, mocks.options);
		});
	});

	describe('findLocationByCoords', () => {
		it('should format coords and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(location);

			const { lat, lon } = mocks.searchParams.coord;
			mocks.options.params.unshift({ key: 'at', value: `${lat},${lon}` });

			void spectator.service.findLocationByCoords(mocks.searchParams.coord);

			expect(apiMock.get).toHaveBeenCalledWith(mocks.revGeocodeUrl, mocks.options);
		});
	});

	describe('findLocationByQuery', () => {
		it('should format query and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(mocks.location);

			mocks.options.params.unshift({ key: 'q', value: mocks.searchParams.query.replace(' ', '+') });

			void spectator.service.findLocationByQuery(mocks.searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(mocks.geocodeUrl, mocks.options);
		});
	});
});
