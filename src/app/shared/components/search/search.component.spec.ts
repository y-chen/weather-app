/* eslint-disable sonarjs/no-duplicate-string */
import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import { getSearchComponentMocks, SearchComponentMocks } from '@wa/app/shared/components/search/search.component.spec.mocks';

describe('SearchComponent', () => {
	let host: SpectatorHost<SearchComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let geoServiceMock: MockProxy<GeoService>;
	let locationServiceMock: MockProxy<LocationService>;

	const createHost = createHostFactory(SearchComponent);

	let mocks: SearchComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		geoServiceMock = mock<GeoService>();
		locationServiceMock = mock<LocationService>();

		mocks = getSearchComponentMocks();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(geoServiceMock);
		mockReset(locationServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-search></wa-search>');

		const search = host.queryHost('wa-search');

		expect(host).toExist();
		expect(search).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-search></wa-search>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should set searchInput.value and calls GeoService.findCities with expected term when searchInput values changes', fakeAsync(() => {
		const term = 'Term';

		geoServiceMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [{ provide: GeoService, useValue: geoServiceMock }],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.detectChanges();
		tick(500);

		expect(host.component.searchInput.value).toEqual(term);
		expect(geoServiceMock.findCities).toHaveBeenCalledWith(term);
	}));

	it('should call GeoService.findLocationByQuery with expected term on Enter key press', fakeAsync(() => {
		const term = 'Term';

		geoServiceMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [{ provide: GeoService, useValue: geoServiceMock }],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.dispatchKeyboardEvent(input, 'keydown', 'Enter');
		host.detectChanges();
		tick(500);

		expect(geoServiceMock.findLocationByQuery).toHaveBeenCalledWith(term);
	}));
});
