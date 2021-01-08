/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

describe('WeatherCardComponent', () => {
	let host: SpectatorHost<WeatherCardComponent>;

	let componentMock: MockProxy<ComponentService>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(WeatherCardComponent);

	let weather: Weather;

	beforeEach(() => {
		const {
			componentServiceMock,

			componentServiceProvider,
			configServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockConfig().mockCultureWithEnglish();

		componentMock = componentServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
		settingsProvider = settingsServiceProvider;

		weather = {
			id: 1,
			title: 'title',
			temperature: 'temperature',
			description: 'description',
			icon: 'icon',
			time: 'Thu Jan 02 2020 02:00:00 GMT+0100',
		};
	});

	afterEach(() => {
		mockReset(componentMock);
	});

	it('should create', () => {
		host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
			hostProps: { weather },
			providers: [configProvider, settingsProvider],
		});

		const weatherCard = host.queryHost('wa-weather-card');

		expect(host).toExist();
		expect(weatherCard).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
			hostProps: { weather },
			providers: [componentProvider, configProvider, settingsProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	describe('header', () => {
		it('should display title and subtite overrides instead of the ones in ViewData when they are provided', () => {
			const titleOverride = 'Title Override';
			const subtitleOverride = 'Subtitle Override';

			host = createHost(
				`<wa-weather-card
          [weather]="weather"
          [title]="titleOverride"
          [subtitle]="subtitleOverride">
        </wa-weather-card>`,
				{
					hostProps: { weather, titleOverride, subtitleOverride },
					providers: [configProvider, settingsProvider],
				},
			);

			const title = host.query('mat-card-title');
			const subtitle = host.query('mat-card-subtitle');

			expect(title).toHaveText(titleOverride);
			expect(title).not.toHaveText(weather.title);
			expect(subtitle).toHaveText(subtitleOverride);
			expect(subtitle).not.toHaveText(weather.time);
		});

		it('should have a wa-favourite component with input id from Weather', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [configProvider, settingsProvider],
			});

			const favouriteComponent = ngMocks.findInstance(FavouriteComponent);

			expect(favouriteComponent.cityId).toBe(weather.id);
		});
	});

	describe('content', () => {
		it('should have a wa-basic-weather component with input Weather data', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [configProvider, settingsProvider],
			});

			const basicWeatherComponent = ngMocks.findInstance(BasicWeatherComponent);

			expect(basicWeatherComponent.weather).toBe(weather);
		});
	});

	describe('actions', () => {
		it('should have a link to details when Weather.id is defined', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [configProvider, settingsProvider],
			});

			const link: HTMLAnchorElement = host.query('.view-forecast-link');

			expect(link.href).toEndWith(weather.id.toString());
		});

		it('should not have a mat-card-action element when Weather.id is not defined', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [configProvider, settingsProvider],
			});

			const matCardAction: Element = host.query('mat-card-action');

			expect(matCardAction).toBeNull();
		});
	});
});
