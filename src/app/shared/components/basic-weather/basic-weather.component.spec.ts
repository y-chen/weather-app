import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { BasicWeatherComponent } from '@wa/app/shared/components/basic-weather/basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	const createHost = createHostFactory({
		component: BasicWeatherComponent,
	});

	it('should create', () => {
		host = createHost('<wa-basic-weather></wa-basic-weather>', {});

		const forecast = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(forecast).toExist();
	});
});
