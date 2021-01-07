import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Config } from '@wa/app/models/config.model';
import { cultures } from '@wa/app/models/culture.model';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';

describe('ToolbarComponent', () => {
	let host: SpectatorHost<ToolbarComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let configServiceMock: MockProxy<ConfigService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(ToolbarComponent);

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
		settingsServiceMock = mock<SettingsService>();

		configServiceMock.getConfig.mockReturnValue(config);
		settingsServiceMock.getCulture.mockReturnValue(cultures[0]);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(configServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-toolbar></wa-toolbar>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const toolbar = host.queryHost('wa-toolbar');

		expect(host).toExist();
		expect(toolbar).toExist();
	});
});
