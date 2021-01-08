import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';

import { BasicWeatherComponent } from './basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(BasicWeatherComponent);

	let testData: TestData;

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		configProvider = configServiceProvider;

		testData = getTestData();
	});

	it('should create', () => {
		host = createHost('<wa-basic-weather [weather]="weather"></wa-basic-weather>', {
			hostProps: { weather: testData.weather },
			providers: [configProvider],
		});

		const basicWeather = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(basicWeather).toExist();
	});

	it('should display Weather as expected', () => {
		const weather = testData.weather;
		host = createHost('<wa-basic-weather [weather]="weather"></wa-basic-weather>', {
			hostProps: { weather },
			providers: [configProvider],
		});

		const temperature: HTMLSpanElement = host.query('.temperature');
		const description: HTMLSpanElement = host.query('.description');
		const image: HTMLImageElement = host.query('img');

		expect(temperature).toHaveText(weather.temperature);
		expect(description).toHaveText(weather.description);
		expect(image.src).toEqual(`http://localhost/${weather.icon}`);
	});
});
