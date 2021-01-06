import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Weather } from '@wa/app/models/open-weather-parser.model';
import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	const createHost = createHostFactory({
		component: BasicWeatherComponent,
	});

	const viewData: Weather = {
		id: 0,
		title: 'title',
		temperature: 'temperature',
		description: 'description',
		icon: 'icon',
		time: 'time',
	};

	it('should create', () => {
		host = createHost('<wa-basic-weather [viewData]="viewData"></wa-basic-weather>', {
			hostProps: { viewData },
		});

		const basicWeather = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(basicWeather).toExist();
	});

	it('should display Weather as expected', () => {
		host = createHost('<wa-basic-weather [viewData]="viewData"></wa-basic-weather>', {
			hostProps: { viewData },
		});

		const temperature: HTMLSpanElement = host.query('.temperature');
		const description: HTMLSpanElement = host.query('.description');
		const image: HTMLImageElement = host.query('img');

		expect(temperature).toHaveText(viewData.temperature);
		expect(description).toHaveText(viewData.description);
		expect(image.src).toEqual(`http://localhost/${viewData.icon}`);
	});
});
