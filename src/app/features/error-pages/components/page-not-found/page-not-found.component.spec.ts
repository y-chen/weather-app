import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import {
	PageNotFoundComponent
} from '@wa/app/features/error-pages/components/page-not-found/page-not-found.component';

describe('PageNotFoundComponent', () => {
	let host: SpectatorHost<PageNotFoundComponent>;

	const createHost = createHostFactory({
		component: PageNotFoundComponent,
	});

	it('should create', () => {
		host = createHost('<wa-page-not-found></wa-page-not-found>');

		const pageNotFound = host.queryHost('wa-page-not-found');

		expect(host).toExist();
		expect(pageNotFound).toExist();
	});
});
