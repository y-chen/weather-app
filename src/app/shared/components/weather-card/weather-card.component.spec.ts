import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { WeatherCardComponent } from '@wa/app/shared/components/weather-card/weather-card.component';

describe('WeatherCardComponent', () => {
	let host: SpectatorHost<WeatherCardComponent>;

	const createHost = createHostFactory({
		component: WeatherCardComponent,
	});

	it('should create', () => {
		host = createHost('<wa-weather-card [viewData]="viewData"></wa-weather-card>', {
			hostProps: {
				viewData: {},
			},
		});

		const forecast = host.queryHost('wa-weather-card');

		expect(host).toExist();
		expect(forecast).toExist();
	});
});
