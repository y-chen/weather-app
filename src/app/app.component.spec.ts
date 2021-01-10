/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { AppComponent } from './app.component';
import { MockMaster } from './common/mock-master';
import { CultureService } from './core/services/culture/culture.service';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;

	let cultureMock: MockProxy<CultureService>;

	let configProvider: Provider;
	let cultureProvider: Provider;

	const createHost = createHostFactory(AppComponent);

	beforeEach(() => {
		const { cultureServiceMock, configServiceProvider, cultureServiceProvider } = new MockMaster().mockConfig();

		cultureMock = cultureServiceMock;

		configProvider = configServiceProvider;
		cultureProvider = cultureServiceProvider;
	});

	afterEach(() => {
		mockReset(cultureMock);
	});

	it('should create the app', () => {
		host = createHost('<wa-root></wa-root>', {
			providers: [configProvider],
		});

		const element = host.queryHost('wa-root');

		expect(element).toBeDefined();
	});

	it('should call CultureService.init', () => {
		host = createHost('<wa-root></wa-root>', {
			providers: [configProvider, cultureProvider],
		});

		expect(cultureMock.init).toHaveBeenCalled();
	});

	it('should have as title weather-app', () => {
		host = createHost('<wa-root></wa-root>', {
			providers: [configProvider],
		});

		const title = host.component.title;

		expect(title).toEqual('weather-app');
	});
});
