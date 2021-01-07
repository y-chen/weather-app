/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Config } from '@wa/app/models/config.model';
import { cultures } from '@wa/app/models/culture.model';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';

describe('ShellComponent', () => {
	let host: SpectatorHost<ShellComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let configServiceMock: MockProxy<ConfigService>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory({ component: ShellComponent });

	const config: Config = {
		here: {
			apiKey: 'HERE-API-KEY',
			urls: {
				geocode: 'GEOCODE-URL',
				revGeocode: 'REV-GEOCODE-URL',
			},
		},
		openWeatherMap: {
			apiKey: 'OPEN-WEATHER-MAP-API-KEY',
			url: 'OPEN-WEATHER-MAP-URL',
		},
	};

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		configServiceMock = mock<ConfigService>();
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		configServiceMock.getConfig.mockReturnValue(config);
		cultureServiceMock.getAvailableCultures.mockReturnValue(cultures);
		settingsServiceMock.getCulture.mockReturnValue(cultures[0]);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(configServiceMock);
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: SettingsService, useValue: settingsServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
			],
		});

		const shell = host.queryHost('wa-shell');

		expect(host).toExist();
		expect(shell).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getRouteData with expected argument', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.getRouteData).toHaveBeenCalledWith('navItems');
	});

	it('should pass a router-outler with name outlet as content to wa-sidebar', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const outlet = host.query('router-outlet[outlet]');

		expect(outlet).toExist();
	});
});
