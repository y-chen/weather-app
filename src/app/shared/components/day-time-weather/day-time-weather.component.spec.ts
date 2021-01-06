/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { DayTimeWeather } from '@wa/app/models/open-weather-parser.model';
import { DayTimeWeatherComponent } from '@wa/app/shared/components/day-time-weather/day-time-weather.component';
import {
	DayTimeWeatherComponentMocks, getDayTimeWeatherComponentMocks
} from '@wa/app/shared/components/day-time-weather/day-time-weather.component.spec.mocks';

import { BasicWeatherComponent } from '../basic-weather/basic-weather.component';

describe('DayTimeWeatherComponent', () => {
	let host: SpectatorHost<DayTimeWeatherComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	let mocks: DayTimeWeatherComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();

		mocks = getDayTimeWeatherComponentMocks();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
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
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should have .unavailable CSS class when DayTimeWeather is not defined', () => {
		host = createHost('<wa-day-time-weather></wa-day-time-weather>');

		const header: Element = host.query('mat-card-header');

		expect(header).toHaveClass('unavailable');
	});

	it('should have a wa-basic-weather for each Weather passed from parent', () => {
		const dayTimeWeather: DayTimeWeather = mocks.dayTimeWeather;

		host = createHost('<wa-day-time-weather [dayTimeWeather]="dayTimeWeather"></wa-day-time-weather>', {
			hostProps: { dayTimeWeather },
		});

		const basicWeathers: BasicWeatherComponent[] = ngMocks.findInstances(BasicWeatherComponent);

		basicWeathers.forEach((basicWeather: BasicWeatherComponent, index: number) =>
			expect(basicWeather.weather).toBe(dayTimeWeather[index]),
		);
	});

	it('should show unavailableTemplate when data is not unavailable', () => {
		host = createHost('<wa-day-time-weather [dayTimeWeather]="dayTimeWeather"></wa-day-time-weather>', {
			hostProps: { dayTimeWeather: null },
		});

		const unavailable: Element = host.query('h1');

		expect(unavailable).toExist();
	});
});
