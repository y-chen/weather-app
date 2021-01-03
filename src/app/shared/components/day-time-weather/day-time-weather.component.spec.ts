import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DayTimeWeatherComponent } from './day-time-weather.component';

describe('DayTimeWeatherComponent', () => {
	let host: SpectatorHost<DayTimeWeatherComponent>;

	const createHost = createHostFactory({
		component: DayTimeWeatherComponent,
	});

	it('should create', () => {
		host = createHost('<wa-day-time-weather></wa-day-time-weather>', {});

		const dayTimeWeather = host.queryHost('wa-day-time-weather');

		expect(host).toExist();
		expect(dayTimeWeather).toExist();
	});
});
