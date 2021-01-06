import { mock, MockProxy } from 'jest-mock-extended';

import { ActivatedRouteSnapshot } from '@angular/router';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Coord, IconSize } from '@wa/app/models/open-weather.model';

import { OpenWeatherService } from '../../services/open-weather/open-weather.service';
import { ForecastResolver } from './forecast.resolver';

describe('ForecastResolver', () => {
	let spectator: SpectatorService<ForecastResolver>;
	let openWeatherServiceMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(ForecastResolver);

	let route: ActivatedRouteSnapshot;

	beforeEach(() => {
		openWeatherServiceMock = mock<OpenWeatherService>();

		spectator = createService({
			providers: [{ provide: OpenWeatherService, useValue: openWeatherServiceMock }],
		});

		route = new ActivatedRouteSnapshot();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('resolve', () => {
		it('should call OpenWeatherService.getForecastById with expected arguments when route param is available', async () => {
			const iconSize: IconSize = 2;
			const id = 1;
			route.data = { iconSize };
			route.params = { id };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getForecastById).toHaveBeenCalledWith({ id, iconSize });
			expect(openWeatherServiceMock.getForecastByCoord).not.toHaveBeenCalled();
		});

		it('should call OpenWeatherService.getForecastByCoord with expected arguments when route param is available', async () => {
			const iconSize: IconSize = 2;
			const coord: Coord = { lat: 1, lon: 1 };
			route.data = { iconSize };
			route.queryParams = { ...coord };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getForecastByCoord).toHaveBeenCalledWith({ coord, iconSize });
			expect(openWeatherServiceMock.getForecastById).not.toHaveBeenCalled();
		});
	});
});
