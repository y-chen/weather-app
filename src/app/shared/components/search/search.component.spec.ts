/* eslint-disable sonarjs/no-duplicate-string */
import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { HereService } from '@wa/app/core/services/here/here.service';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import { getSearchComponentMocks, SearchComponentMocks } from '@wa/app/shared/components/search/search.component.spec.mocks';

describe('SearchComponent', () => {
	let host: SpectatorHost<SearchComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let hereServiceMock: MockProxy<HereService>;
	let locationServiceMock: MockProxy<LocationService>;

	const createHost = createHostFactory(SearchComponent);

	let mocks: SearchComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		hereServiceMock = mock<HereService>();
		locationServiceMock = mock<LocationService>();

		mocks = getSearchComponentMocks();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(hereServiceMock);
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

	it('should set searchInput.value and calls HereService.findCities with expected term when searchInput values changes', fakeAsync(() => {
		const term = 'Term';

		hereServiceMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [{ provide: HereService, useValue: hereServiceMock }],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.detectChanges();
		tick(500);

		expect(host.component.searchInput.value).toEqual(term);
		expect(hereServiceMock.findCities).toHaveBeenCalledWith(term);
	}));

	it('should call HereService.findLocationByQuery with expected term on Enter key press', fakeAsync(() => {
		const term = 'Term';

		hereServiceMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [{ provide: HereService, useValue: hereServiceMock }],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.dispatchKeyboardEvent(input, 'keydown', 'Enter');
		host.detectChanges();
		tick(500);

		expect(hereServiceMock.findLocationByQuery).toHaveBeenCalledWith(term);
	}));
});
