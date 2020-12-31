import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { SidebarComponent } from '@wa/app/shared/components/shell/sidebar/sidebar.component';

describe('SidebarComponent', () => {
	let host: SpectatorHost<SidebarComponent>;

	const createHost = createHostFactory({
		component: SidebarComponent,
	});

	it('should create', () => {
		host = createHost('<wa-sidebar></wa-sidebar>');

		const sidebar = host.queryHost('wa-sidebar');

		expect(host).toExist();
		expect(sidebar).toExist();
	});
});
