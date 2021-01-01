import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import {
	BasicWeatherComponent
} from '@wa/app/shared/components/basic-weather/basic-weather.component';

describe('BasicWeatherComponent', () => {
	let host: SpectatorHost<BasicWeatherComponent>;

	const createHost = createHostFactory({
		component: BasicWeatherComponent,
	});

	it('should create', () => {
		host = createHost('<wa-basic-weather [viewData]="viewData"></wa-basic-weather>', {
			hostProps: {
				viewData: {
					temperature: 'temperature',
					description: 'description',
					icon: 'icon',
				},
			},
		});

		const forecast = host.queryHost('wa-basic-weather');

		expect(host).toExist();
		expect(forecast).toExist();
	});
});
