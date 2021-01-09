import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
	let host: SpectatorHost<AboutMeComponent>;

	const createHost = createHostFactory(AboutMeComponent);

	it('should create', () => {
		host = createHost('<wa-about-me></wa-about-me>');

		const me = host.queryHost('wa-about-me');

		expect(host).toExist();
		expect(me).toExist();
	});
});
