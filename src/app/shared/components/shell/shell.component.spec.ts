import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';

describe('ShellComponent', () => {
	let host: SpectatorHost<ShellComponent>;

	const createHost = createHostFactory({
		component: ShellComponent,
	});

	it('should create', () => {
		host = createHost('<wa-shell></wa-shell>', {});

		const shell = host.queryHost('wa-shell');

		expect(host).toExist();
		expect(shell).toExist();
	});
});
