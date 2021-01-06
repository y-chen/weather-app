import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	const createHost = createHostFactory({
		component: BasicWeatherComponent,
	});

	const weather: Weather = {
		id: 0,
		title: 'title',
		temperature: 'temperature',
		description: 'description',
		icon: 'icon',
		time: 'time',
	};

	it('should create', () => {
		host = createHost('<wa-basic-weather [weather]="weather"></wa-basic-weather>', {
			hostProps: { weather },
		});

		const basicWeather = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(basicWeather).toExist();
	});

	it('should display Weather as expected', () => {
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
