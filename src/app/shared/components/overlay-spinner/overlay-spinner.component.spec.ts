import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

describe('OverlaySpinnerComponent', () => {
	let host: SpectatorHost<OverlaySpinnerComponent>;

	const createHost = createHostFactory(OverlaySpinnerComponent);

	it('should create', () => {
		host = createHost('<cvm-overlay-spinner></cvm-overlay-spinner>');

		const overlay = host.queryHost('cvm-overlay-spinner');

		expect(host).toExist();
		expect(overlay).toExist();
	});
});
