/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ViewWeather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

describe('WeatherCardComponent', () => {
	let host: SpectatorHost<WeatherCardComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory(WeatherCardComponent);
	const viewData: ViewWeather = {
		id: 0,
		title: 'title',
		temperature: 'temperature',
		description: 'description',
		icon: 'icon',
		time: 'time',
	};

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
			hostProps: { viewData },
		});

		const weatherCard = host.queryHost('wa-weather-card');

		expect(host).toExist();
		expect(weatherCard).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
			hostProps: { viewData },
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	describe('header', () => {
		it('should display title and subtite overrides instead of the ones in ViewData when they are provided', () => {
			const titleOverride = 'Title Override';
			const subtitleOverride = 'Subtitle Override';

			host = createHost(
				`<wa-weather-card
          [viewData]="viewData"
          [title]="titleOverride"
          [subtitle]="subtitleOverride">
        </wa-weather-card>`,
				{
					hostProps: { viewData, titleOverride, subtitleOverride },
				},
			);

			const title = host.query('mat-card-title');
			const subtitle = host.query('mat-card-subtitle');

			expect(title).toHaveText(titleOverride);
			expect(title).not.toHaveText(viewData.title);
			expect(subtitle).toHaveText(subtitleOverride);
			expect(subtitle).not.toHaveText(viewData.time);
		});
	});

	describe('content', () => {
		it('should have a wa-basic-weather component with input ViewWeather data', () => {
			host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
				hostProps: { viewData },
			});

			const basicWeatherComponentMock = ngMocks.findInstance(BasicWeatherComponent);

			expect(basicWeatherComponentMock.viewData).toBe(viewData);
		});
	});
});
