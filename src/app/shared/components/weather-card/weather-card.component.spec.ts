/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

import { FavouriteComponent } from '../favourite/favourite.component';

describe('WeatherCardComponent', () => {
	let host: SpectatorHost<WeatherCardComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory(WeatherCardComponent);

	let viewData: Weather;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();

		viewData = {
			id: 1,
			title: 'title',
			temperature: 'temperature',
			description: 'description',
			icon: 'icon',
			time: 'time',
		};
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

		it('should have a wa-favourite component with input id from Weather', () => {
			host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
				hostProps: { viewData },
			});

			const favouriteComponent = ngMocks.findInstance(FavouriteComponent);

			expect(favouriteComponent.cityId).toBe(viewData.id);
		});
	});

	describe('content', () => {
		it('should have a wa-basic-weather component with input Weather data', () => {
			host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
				hostProps: { viewData },
			});

			const basicWeatherComponent = ngMocks.findInstance(BasicWeatherComponent);

			expect(basicWeatherComponent.viewData).toBe(viewData);
		});

		describe('actions', () => {
			it('should have a link to details when Weather.id is defined', () => {
				host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
					hostProps: { viewData },
				});

				const link: HTMLAnchorElement = host.query('.view-forecast-link');

				expect(link.href).toEndWith(viewData.id.toString());
			});

			it('should not have a mat-card-action element when Weather.id is not defined', () => {
				host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
					hostProps: { viewData },
				});

				const matCardAction: Element = host.query('mat-card-action');

				expect(matCardAction).toBeNull();
			});
		});
	});
});
