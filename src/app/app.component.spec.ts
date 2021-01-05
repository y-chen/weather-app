/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AppComponent } from '@wa/app/app.component';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;
	let cultureServiceMock: MockProxy<CultureService>;

	const createHost = createHostFactory(AppComponent);

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();
	});

	afterEach(() => {
		mockReset(cultureServiceMock);
	});

	it('should create the app', () => {
		host = createHost('<wa-root></wa-root>');

		const element = host.queryHost('wa-root');

		expect(element).toBeDefined();
	});

	it('should call CultureService.init', () => {
		host = createHost('<wa-root></wa-root>', {
			providers: [{ provide: CultureService, useValue: cultureServiceMock }],
		});

		expect(cultureServiceMock.init).toHaveBeenCalled();
	});

	it('should have as title weather-app', () => {
		host = createHost('<wa-root></wa-root>');

		const title = host.component.title;

		expect(title).toEqual('weather-app');
	});
});
