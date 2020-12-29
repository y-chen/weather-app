import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
	let host: SpectatorHost<NavItemComponent>;

	const createHost = createHostFactory({
		component: NavItemComponent,
	});

	it('should create', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item: { icon: 'test', label: 'test', route: 'test' } },
		});

		const navItem = host.queryHost('wa-nav-item');

		expect(host).toExist();
		expect(navItem).toExist();
	});
});
