/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { HomeComponent } from '@wa/app/features/home/components/home/home.component';
import { getHomeComponentMocks, HomeComponentMocks } from '@wa/app/features/home/components/home/home.component.spec.mocks';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

describe('HomeComponent', () => {
	let host: SpectatorHost<HomeComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory({
		component: HomeComponent,
	});

	let mocks: HomeComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();

		mocks = getHomeComponentMocks();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-home></wa-home>');

		const home = host.queryHost('wa-home');

		expect(host).toExist();
		expect(home).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should ComponentService.getResolverData with expected paramName', () => {
		host = createHost('<wa-home></wa-home>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.getResolverData).toHaveBeenCalledWith('favouritesWeather');
	});

	it('should have many wa-weather-card components with expected Weather input as returned from resolver', () => {
		const viewWeathers: Weather[] = mocks.viewWeathers;

		componentServiceMock.getResolverData.calledWith('favouritesWeather').mockResolvedValue(viewWeathers as never);

		host = createHost('<wa-home></wa-home>');

		const weatherCards: WeatherCardComponent[] = ngMocks.findInstances(WeatherCardComponent);

		weatherCards.forEach((weatherCard: WeatherCardComponent, index: number) => expect(weatherCard.weather).toBe(viewWeathers[index]));
	});

	it('should display wa-missing-data component when ComponentService.getResolverData return not defined result', () => {
		host = createHost('<wa-home></wa-home>');

		const missingData: Element = host.query('wa-missing-data');

		expect(missingData).toExist();
	});
});
