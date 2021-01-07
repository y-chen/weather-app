/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Culture } from '@wa/app/models/culture.model';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

describe('WeatherCardComponent', () => {
	let host: SpectatorHost<WeatherCardComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(WeatherCardComponent);

	let weather: Weather;
	let culture: Culture;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		settingsServiceMock = mock<SettingsService>();

		weather = {
			id: 1,
			title: 'title',
			temperature: 'temperature',
			description: 'description',
			icon: 'icon',
			time: 'Thu Jan 02 2020 02:00:00 GMT+0100',
		};

		culture = {
			label: 'Italiano',
			language: 'it',
			code: 'it-IT',
		};

		settingsServiceMock.getCulture.mockReturnValue(culture);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
			hostProps: { weather },
			providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
		});

		const weatherCard = host.queryHost('wa-weather-card');

		expect(host).toExist();
		expect(weatherCard).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
			hostProps: { weather },
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
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
					providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
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
				providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
			});

			const favouriteComponent = ngMocks.findInstance(FavouriteComponent);

			expect(favouriteComponent.cityId).toBe(weather.id);
		});
	});

	describe('content', () => {
		it('should have a wa-basic-weather component with input Weather data', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
			});

			const basicWeatherComponent = ngMocks.findInstance(BasicWeatherComponent);

			expect(basicWeatherComponent.weather).toBe(weather);
		});
	});

	describe('actions', () => {
		it('should have a link to details when Weather.id is defined', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
			});

			const link: HTMLAnchorElement = host.query('.view-forecast-link');

			expect(link.href).toEndWith(weather.id.toString());
		});

		it('should not have a mat-card-action element when Weather.id is not defined', () => {
			host = createHost('<wa-weather-card [weather]="weather"></wa-weather-card>', {
				hostProps: { weather },
				providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
			});

			const matCardAction: Element = host.query('mat-card-action');

			expect(matCardAction).toBeNull();
		});
	});
});
