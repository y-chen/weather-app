/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { NavItem } from '@wa/app/models/navigation.model';
import { NavItemComponent } from '@wa/app/shared/components/shell/sidebar/nav-item/nav-item.component';

describe('NavItemComponent', () => {
	let host: SpectatorHost<NavItemComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory(NavItemComponent);

	let item: NavItem;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();

		item = { icon: 'Icon', label: 'Label', route: 'Route' };
	});

	afterEach(() => {
		mockReset(componentServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		const navItem = host.queryHost('wa-nav-item');

		expect(host).toExist();
		expect(navItem).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should have a link to the NavItem.route', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
		});

		const link: HTMLAnchorElement = host.query('a');

		expect(link.href).toEndWith(item.route);
	});

	it('should have correct icon and label', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
		});

		const icon: Element = host.query(byText(item.icon));
		const label: HTMLSpanElement = host.query(byText(item.label));

		expect(icon).toExist();
		expect(label).toExist();
	});

	it('should not display label when input open is false', () => {
		const open = false;

		host = createHost('<wa-nav-item [item]="item" [open]="open"></wa-nav-item>', {
			hostProps: { item, open },
		});

		const label: HTMLSpanElement = host.query(byText(item.label));

		expect(label).toBeNull();
	});
});
