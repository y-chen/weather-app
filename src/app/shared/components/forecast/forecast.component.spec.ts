import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { ForecastComponent } from '@wa/app/shared/components/forecast/forecast.component';

describe('ForecastComponent', () => {
	let host: SpectatorHost<ForecastComponent>;

	const createHost = createHostFactory({
		component: ForecastComponent,
	});

	it('should create', () => {
		host = createHost('<wa-forecast></wa-forecast>', {});

		const forecast = host.queryHost('wa-forecast');

		expect(host).toExist();
		expect(forecast).toExist();
	});
});
