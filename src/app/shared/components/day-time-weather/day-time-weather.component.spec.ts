/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */

import { MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { Provider } from '@angular/compiler/src/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { DayTimeWeather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { DayTimeWeatherComponent } from '@wa/app/shared/components/day-time-weather/day-time-weather.component';

describe('DayTimeWeatherComponent', () => {
	let host: SpectatorHost<DayTimeWeatherComponent>;

	let componentMock: MockProxy<ComponentService>;
	let settingsMock: MockProxy<SettingsService>;

	let componentProvider: Provider;
	let settingsProvider: Provider;

	let testData: TestData;

	beforeEach(() => {
		const {
			componentServiceMock,
			settingsServiceMock,

			componentServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockSettings();

		componentMock = componentServiceMock;
		settingsMock = settingsServiceMock;

		componentProvider = componentServiceProvider;
		settingsProvider = settingsServiceProvider;

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(settingsMock);
	});

	const createHost = createHostFactory(DayTimeWeatherComponent);

	it('should create', () => {
		host = createHost('<wa-day-time-weather></wa-day-time-weather>');

		const dayTimeWeather = host.queryHost('wa-day-time-weather');

		expect(host).toExist();
		expect(dayTimeWeather).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-day-time-weather></wa-day-time-weather>', {
			providers: [componentProvider, settingsProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should have .unavailable CSS class when DayTimeWeather is not defined', () => {
		host = createHost('<wa-day-time-weather></wa-day-time-weather>', {
			providers: [componentProvider, settingsProvider],
		});

		const header: Element = host.query('mat-card-header');

		expect(header).toHaveClass('unavailable');
	});

	it('should have a wa-basic-weather for each Weather passed from parent', () => {
		const dayTimeWeather: DayTimeWeather = testData.dayTimeWeather;

		host = createHost('<wa-day-time-weather [dayTimeWeather]="dayTimeWeather"></wa-day-time-weather>', {
			hostProps: { dayTimeWeather },
			providers: [componentProvider, settingsProvider],
		});

		const basicWeathers: BasicWeatherComponent[] = ngMocks.findInstances(BasicWeatherComponent);

		basicWeathers.forEach((basicWeather: BasicWeatherComponent, index: number) =>
			expect(basicWeather.weather).toBe(dayTimeWeather[index]),
		);
	});

	it('should show unavailableTemplate when data is not unavailable', () => {
		host = createHost('<wa-day-time-weather [dayTimeWeather]="dayTimeWeather"></wa-day-time-weather>', {
			hostProps: { dayTimeWeather: null },
			providers: [componentProvider, settingsProvider],
		});

		const unavailable: Element = host.query('h1');

		expect(unavailable).toExist();
	});
});
