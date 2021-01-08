import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { ForecastResolver } from '@wa/app/core/resolvers/forecast/forecast.resolver';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';

describe('ForecastResolver', () => {
	let spectator: SpectatorService<ForecastResolver>;
	let openWeatherMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(ForecastResolver);

	let master: MasterMock;
	let testData: TestData;

	beforeEach(() => {
		master = new MasterMock();

		const { openWeatherServiceMock, openWeatherServiceProvider } = master;

		openWeatherMock = openWeatherServiceMock;

		spectator = createService({
			providers: [openWeatherServiceProvider],
		});

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(openWeatherMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('resolve', () => {
		it('should call OpenWeatherService.getForecastById with expected arguments when route param is available', async () => {
			const { iconSize, id, route } = testData;
			route.data = { iconSize };
			route.params = { id };

			await spectator.service.resolve(route);

			expect(openWeatherMock.getForecastById).toHaveBeenCalledWith({ id, iconSize });
			expect(openWeatherMock.getForecastByCoord).not.toHaveBeenCalled();
		});

		it('should call OpenWeatherService.getForecastByCoord with expected arguments when route param is available', async () => {
			const { coord, iconSize, route } = testData;
			route.data = { iconSize };
			route.queryParams = { ...coord };

			await spectator.service.resolve(route);

			expect(openWeatherMock.getForecastByCoord).toHaveBeenCalledWith({ coord, iconSize });
			expect(openWeatherMock.getForecastById).not.toHaveBeenCalled();
		});
	});
});
