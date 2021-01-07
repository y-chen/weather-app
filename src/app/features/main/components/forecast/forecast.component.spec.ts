/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { ForecastComponent } from '@wa/app/features/main/components/forecast/forecast.component';
import { Config } from '@wa/app/models/config.model';

describe('ForecastComponent', () => {
	let host: SpectatorHost<ForecastComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let configServiceMock: MockProxy<ConfigService>;

	const createHost = createHostFactory(ForecastComponent);

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

		configServiceMock.getConfig.mockReturnValue(config);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(configServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [{ provide: ConfigService, useValue: configServiceMock }],
		});

		const forecast = host.queryHost('wa-forecast');

		expect(host).toExist();
		expect(forecast).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
			],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getResolverData with expected param name', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: ConfigService, useValue: configServiceMock },
			],
		});

		expect(componentServiceMock.getResolverData).toHaveBeenCalledWith('forecast');
	});
});
