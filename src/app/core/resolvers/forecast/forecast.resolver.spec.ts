import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ForecastResolver } from '@wa/app/core/resolvers/forecast/forecast.resolver';
import { ForecastResolverMocks, getForecastResolverMocks } from '@wa/app/core/resolvers/forecast/forecast.resolver.spec.mocks';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';

describe('ForecastResolver', () => {
	let spectator: SpectatorService<ForecastResolver>;
	let openWeatherMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(ForecastResolver);

	let master: MasterMock;
	let mocks: ForecastResolverMocks;

	beforeEach(() => {
		master = new MasterMock();
		mocks = getForecastResolverMocks();

		const { openWeatherServiceMock, openWeatherServiceProvider } = master;

		openWeatherMock = openWeatherServiceMock;

		spectator = createService({
			providers: [openWeatherServiceProvider],
		});
	});

	afterEach(() => {
		mockReset(openWeatherMock);
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

			expect(openWeatherMock.getForecastById).toHaveBeenCalledWith({ id, iconSize });
			expect(openWeatherMock.getForecastByCoord).not.toHaveBeenCalled();
		});

		it('should call OpenWeatherService.getForecastByCoord with expected arguments when route param is available', async () => {
			const { coord, iconSize, route } = mocks;
			route.data = { iconSize };
			route.queryParams = { ...coord };

			await spectator.service.resolve(route);

			expect(openWeatherMock.getForecastByCoord).toHaveBeenCalledWith({ coord, iconSize });
			expect(openWeatherMock.getForecastById).not.toHaveBeenCalled();
		});
	});
});
