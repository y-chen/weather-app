/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { HereService } from '@wa/app/core/services/here/here.service';
import { SearchComponent } from '@wa/app/shared/components/search/search.component';
import { getSearchComponentMocks, SearchComponentMocks } from '@wa/app/shared/components/search/search.component.spec.mocks';

describe('SearchComponent', () => {
	let host: SpectatorHost<SearchComponent>;

	let componentMock: MockProxy<ComponentService>;
	let configMock: MockProxy<ConfigService>;
	let hereMock: MockProxy<HereService>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let hereProvider: Provider;

	const createHost = createHostFactory(SearchComponent);

	let mocks: SearchComponentMocks;

	beforeEach(() => {
		const {
			componentServiceMock,
			configServiceMock,
			hereServiceMock,

			componentServiceProvider,
			configServiceProvider,
			hereServiceProvider,
		} = new MasterMock().mockConfig();

		componentMock = componentServiceMock;
		configMock = configServiceMock;
		hereMock = hereServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
		hereProvider = hereServiceProvider;

		mocks = getSearchComponentMocks();
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(configMock);
		mockReset(hereMock);
	});

	it('should create', () => {
		host = createHost('<wa-search></wa-search>', {
			providers: [configProvider],
		});

		const search = host.queryHost('wa-search');

		expect(host).toExist();
		expect(search).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-search></wa-search>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should set searchInput.value and calls HereService.findCities with expected term when searchInput values changes', fakeAsync(() => {
		const term = 'Term';

		hereMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [hereProvider],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.detectChanges();
		tick(500);

		expect(host.component.searchInput.value).toEqual(term);
		expect(hereMock.findCities).toHaveBeenCalledWith(term);
	}));

	it('should call HereService.findLocationByQuery with expected term on Enter key press', fakeAsync(() => {
		const term = 'Term';

		hereMock.findLocationByQuery.mockResolvedValue(mocks.location);

		host = createHost('<wa-search></wa-search>', {
			providers: [hereProvider],
		});

		const input: HTMLInputElement = host.query('input');
		input.value = term;
		input.dispatchEvent(new Event('input'));
		host.dispatchKeyboardEvent(input, 'keydown', 'Enter');
		host.detectChanges();
		tick(500);

		expect(hereMock.findLocationByQuery).toHaveBeenCalledWith(term);
	}));
});
