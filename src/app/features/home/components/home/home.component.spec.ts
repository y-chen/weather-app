import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { HomeComponent } from '@wa/app/features/home/components/home/home.component';

describe('HomeComponent', () => {
	let host: SpectatorHost<HomeComponent>;

	const createHost = createHostFactory({
		component: HomeComponent,
	});

	it('should create', () => {
		host = createHost('<wa-home></wa-home>', {});

		const home = host.queryHost('wa-home');

		expect(host).toExist();
		expect(home).toExist();
	});
});
