/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */

import { MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	let host: SpectatorHost<HomeComponent>;

	let componentMock: MockProxy<ComponentService>;
	let configMock: MockProxy<ConfigService>;

	let componentProvider: Provider;
	let configProvider: Provider;

	const createHost = createHostFactory(HomeComponent);

	let testData: TestData;

	beforeEach(() => {
		const { componentServiceMock, configServiceMock, componentServiceProvider, configServiceProvider } = new MasterMock().mockConfig();

		componentMock = componentServiceMock;
		configMock = configServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(configMock);
	});

	it('should create', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [componentProvider, configProvider],
		});

		const home = host.queryHost('wa-home');

		expect(host).toExist();
		expect(home).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should ComponentService.getResolverData with expected paramName', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.getResolverData).toHaveBeenCalledWith('favouritesWeather');
	});

	it('should have many wa-weather-card components with expected Weather input as returned from resolver', () => {
		const weathers: Weather[] = testData.weathers;

		componentMock.getResolverData.calledWith('favouritesWeather').mockResolvedValue(weathers as never);

		host = createHost('<wa-home></wa-home>', {
			providers: [componentProvider, configProvider],
		});

		const weatherCards: WeatherCardComponent[] = ngMocks.findInstances(WeatherCardComponent);

		weatherCards.forEach((weatherCard: WeatherCardComponent, index: number) => expect(weatherCard.weather).toBe(weathers[index]));
	});

	it('should display wa-missing-data component when ComponentService.getResolverData return not defined result', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [componentProvider, configProvider],
		});

		const missingData: Element = host.query('wa-missing-data');

		expect(missingData).toExist();
	});
});
