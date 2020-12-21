import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let host: SpectatorHost<SearchComponent>;

	const createHost = createHostFactory({
		component: SearchComponent,
	});

	it('should create', () => {
		host = createHost('<wa-search></wa-search>', {});

		const search = host.queryHost('wa-search');

		expect(host).toExist();
		expect(search).toExist();
	});
});
