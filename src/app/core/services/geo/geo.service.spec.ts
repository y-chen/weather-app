import { anyObject, mock, MockProxy, mockReset } from 'jest-mock-extended';
import * as lodash from 'lodash';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import {
	autocompleteUrlMock, defaultOptionsMock, geocodeUrlMock, locationMock, lookupUrlMock, revGeocodeUrlMock, searchParamsMock
} from '@wa/app/core/services/geo/geo.service.spec.mocks';
import { SearchParams, SearchResult } from '@wa/app/models/here-api.model';
import { HttpOptions } from '@wa/app/models/http.model';

describe('GeoService', () => {
	let spectator: SpectatorService<GeoService>;
	let apiMock: MockProxy<ApiService>;

	const createService = createServiceFactory({
		service: GeoService,
		mocks: [ApiService],
	});

	let geocodeUrl: string;
	let revGeocodeUrl: string;
	let autocompleteUrl: string;
	let lookupUrl: string;
	let options: HttpOptions;
	let searchParams: SearchParams;
	let location: SearchResult;

	beforeEach(() => {
		apiMock = mock<ApiService>();

		mockReset(apiMock);

		spectator = createService({
			providers: [{ provide: ApiService, useValue: apiMock }],
		});

		geocodeUrl = lodash.clone(geocodeUrlMock);
		revGeocodeUrl = lodash.clone(revGeocodeUrlMock);
		autocompleteUrl = lodash.clone(autocompleteUrlMock);
		lookupUrl = lodash.clone(lookupUrlMock);

		options = lodash.cloneDeep(defaultOptionsMock);
		searchParams = lodash.clone(searchParamsMock);
		location = lodash.clone(locationMock);
	});

	it('should be defined', () => {
		void expect(spectator.service).toBeDefined();
	});

	describe('locationLookup', () => {
		it('should call findLocationById, not findLocationByCoords or findLocationByQuery when param id has value', () => {
			apiMock.get.mockResolvedValue(location);

			searchParams.coord = null;
			searchParams.query = null;

			void spectator.service.locationLookup(searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(revGeocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(geocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByCoords, not findLocationById or findLocationByQuery when param coord has value', () => {
			apiMock.get.mockResolvedValue([location]);

			searchParams.id = null;
			searchParams.query = null;

			void spectator.service.locationLookup(searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, revGeocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(geocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});

		it('should call findLocationByQuery, not findLocationById or findLocationByCoords when param query has value', () => {
			apiMock.get.mockResolvedValue(location);

			searchParams.id = null;
			searchParams.coord = null;

			void spectator.service.locationLookup(searchParams);

			expect(apiMock.get).toHaveBeenNthCalledWith(1, geocodeUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(lookupUrl, anyObject());
			expect(apiMock.get).not.toHaveBeenCalledWith(revGeocodeUrl, anyObject());
			expect(apiMock.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('findCities', () => {
		it('should format query and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue([location]);

			options.params.unshift({ key: 'q', value: searchParams.query.replace(' ', '+') }, { key: 'limit', value: 20 });

			void spectator.service.findCities(searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(autocompleteUrl, options);
		});
	});

	describe('findLocationById', () => {
		it('should format id and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(location);

			options.params.unshift({ key: 'id', value: searchParams.id });

			void spectator.service.findLocationById(searchParams.id);

			expect(apiMock.get).toHaveBeenCalledWith(lookupUrl, options);
		});
	});

	describe('findLocationByCoords', () => {
		it('should format coords and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(location);

			const { lat, lon } = searchParams.coord;
			options.params.unshift({ key: 'at', value: `${lat},${lon}` });

			void spectator.service.findLocationByCoords(searchParams.coord);

			expect(apiMock.get).toHaveBeenCalledWith(revGeocodeUrl, options);
		});
	});

	describe('findLocationByQuery', () => {
		it('should format query and call ApiService.get with expected arguments', () => {
			apiMock.get.mockResolvedValue(location);

			options.params.unshift({ key: 'q', value: searchParams.query.replace(' ', '+') });

			void spectator.service.findLocationByQuery(searchParams.query);

			expect(apiMock.get).toHaveBeenCalledWith(geocodeUrl, options);
		});
	});
});
