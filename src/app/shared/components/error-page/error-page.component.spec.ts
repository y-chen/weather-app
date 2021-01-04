import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';

describe('ErrorPageComponent', () => {
	let host: SpectatorHost<ErrorPageComponent>;

	const createHost = createHostFactory({
		component: ErrorPageComponent,
	});

	it('should create', () => {
		host = createHost('<wa-error-page></wa-error-page>');

		const errorPage = host.queryHost('wa-error-page');

		expect(host).toExist();
		expect(errorPage).toExist();
	});
});
