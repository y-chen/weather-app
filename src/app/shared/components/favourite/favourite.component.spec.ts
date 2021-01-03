import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';

describe('FavouriteComponent', () => {
	let host: SpectatorHost<FavouriteComponent>;

	const createHost = createHostFactory({
		component: FavouriteComponent,
	});

	it('should create', () => {
		host = createHost('<wa-favourite></wa-favourite>', {});

		const favourite = host.queryHost('wa-favourite');

		expect(host).toExist();
		expect(favourite).toExist();
	});
});
