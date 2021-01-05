import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MissingDataComponent } from '@wa/app/shared/components/missing-data/missing-data.component';

describe('MissingDataComponent', () => {
	let host: SpectatorHost<MissingDataComponent>;

	const createHost = createHostFactory({
		component: MissingDataComponent,
	});

	it('should create', () => {
		host = createHost('<wa-missing-data></wa-missing-data>');

		const search = host.queryHost('wa-missing-data');

		expect(host).toExist();
		expect(search).toExist();
	});
});
