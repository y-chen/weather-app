import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	const createHost = createHostFactory(BasicWeatherComponent);

	let testData: TestData;

	beforeEach(() => {
		testData = getTestData();
	});

	it('should create', () => {
		host = createHost('<wa-basic-weather [weather]="weather"></wa-basic-weather>', {
			hostProps: { weather: testData.weather },
		});

		const basicWeather = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(basicWeather).toExist();
	});

	it('should display Weather as expected', () => {
		const weather = testData.weather;
		host = createHost('<wa-basic-weather [weather]="weather"></wa-basic-weather>', {
			hostProps: { weather },
		});

		const temperature: HTMLSpanElement = host.query('.temperature');
		const description: HTMLSpanElement = host.query('.description');
		const image: HTMLImageElement = host.query('img');

		expect(temperature).toHaveText(weather.temperature);
		expect(description).toHaveText(weather.description);
		expect(image.src).toEqual(`http://localhost/${weather.icon}`);
	});
});
