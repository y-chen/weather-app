/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AppComponent } from '@wa/app/app.component';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

import { MasterMock } from './common/master-mock';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;

	let cultureMock: MockProxy<CultureService>;

	let cultureProvider: Provider;

	const createHost = createHostFactory(AppComponent);

	beforeEach(() => {
		const { cultureServiceMock, cultureServiceProvider } = new MasterMock();

		cultureMock = cultureServiceMock;

		cultureProvider = cultureServiceProvider;
	});

	afterEach(() => {
		mockReset(cultureMock);
	});

	it('should create the app', () => {
		host = createHost('<wa-root></wa-root>');

		const element = host.queryHost('wa-root');

		expect(element).toBeDefined();
	});

	it('should call CultureService.init', () => {
		host = createHost('<wa-root></wa-root>', {
			providers: [cultureProvider],
		});

		expect(cultureMock.init).toHaveBeenCalled();
	});

	it('should have as title weather-app', () => {
		host = createHost('<wa-root></wa-root>');

		const title = host.component.title;

		expect(title).toEqual('weather-app');
	});
});
