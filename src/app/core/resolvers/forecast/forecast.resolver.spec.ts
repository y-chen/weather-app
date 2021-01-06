import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ForecastResolver } from '@wa/app/core/resolvers/forecast/forecast.resolver';
import { ForecastResolverMocks, getForecastResolverMocks } from '@wa/app/core/resolvers/forecast/forecast.resolver.spec.mocks';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';

describe('ForecastResolver', () => {
	let spectator: SpectatorService<ForecastResolver>;
	let openWeatherServiceMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(ForecastResolver);

	let mocks: ForecastResolverMocks;

	beforeEach(() => {
		openWeatherServiceMock = mock<OpenWeatherService>();

		spectator = createService({
			providers: [{ provide: OpenWeatherService, useValue: openWeatherServiceMock }],
		});

		mocks = getForecastResolverMocks();
	});

	afterEach(() => {
		mockReset(openWeatherServiceMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('resolve', () => {
		it('should call OpenWeatherService.getForecastById with expected arguments when route param is available', async () => {
			const { iconSize, id, route } = mocks;
			route.data = { iconSize };
			route.params = { id };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getForecastById).toHaveBeenCalledWith({ id, iconSize });
			expect(openWeatherServiceMock.getForecastByCoord).not.toHaveBeenCalled();
		});

		it('should call OpenWeatherService.getForecastByCoord with expected arguments when route param is available', async () => {
			const { coord, iconSize, route } = mocks;
			route.data = { iconSize };
			route.queryParams = { ...coord };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getForecastByCoord).toHaveBeenCalledWith({ coord, iconSize });
			expect(openWeatherServiceMock.getForecastById).not.toHaveBeenCalled();
		});
	});
});
