/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */

import { MockProxy, mockReset } from 'jest-mock-extended';
import { ngMocks } from 'ng-mocks';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { NavItem } from '@wa/app/models/navigation.model';
import { NavItemComponent } from '@wa/app/shared/components/shell/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '@wa/app/shared/components/shell/sidebar/sidebar.component';

describe('SidebarComponent', () => {
	let host: SpectatorHost<SidebarComponent>;

	let componentMock: MockProxy<ComponentService>;

	let componentProvider: Provider;

	const createHost = createHostFactory(SidebarComponent);

	let navItems: NavItem[];

	beforeEach(() => {
		const { componentServiceMock, componentServiceProvider } = new MasterMock();

		componentMock = componentServiceMock;

		componentProvider = componentServiceProvider;

		navItems = [
			{ icon: 'First Icon', label: 'First Label', route: 'First Route' },
			{ icon: 'Second Icon', label: 'Second Label', route: 'Second Route' },
		];
	});

	afterEach(() => {
		mockReset(componentMock);
	});

	it('should create', () => {
		host = createHost('<wa-sidebar></wa-sidebar>');

		const sidebar = host.queryHost('wa-sidebar');

		expect(host).toExist();
		expect(sidebar).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-sidebar></wa-sidebar>', {
			providers: [componentProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should render as many wa-nav-item elements as input NavItem[] length', () => {
		host = createHost('<wa-sidebar [navItems]="navItems"></wa-sidebar>', {
			hostProps: { navItems },
		});

		const items: Element[] = host.queryAll('wa-nav-item');

		expect(items).toHaveLength(navItems.length);
	});

	it('should pass as input the NavItem as expected', () => {
		host = createHost('<wa-sidebar [navItems]="navItems"></wa-sidebar>', {
			hostProps: { navItems },
		});

		const navItemComponents: NavItemComponent[] = ngMocks.findInstances(NavItemComponent);

		navItemComponents.forEach((navItem: NavItemComponent, index: number) => expect(navItem.item).toBe(navItems[index]));
	});

	it('should has class .closed on toggle element click', () => {
		host = createHost('<wa-sidebar></wa-sidebar>');

		const beforeClick: Element = host.query('.closed');
		host.click('.sidebar-toggle');
		const afterClick: Element = host.query('.closed');

		expect(beforeClick).toBeNull();
		expect(afterClick).toExist();
	});

	it('should change toggle closed value on toggle element', () => {
		host = createHost('<wa-sidebar></wa-sidebar>');

		const beforeClick: boolean = host.component.closed;
		host.click('.sidebar-toggle');
		const afterClick: boolean = host.component.closed;

		expect(beforeClick).toBeFalse();
		expect(afterClick).toBeTrue();
	});

	it('should display proper mat-icon before and after click on toggle element', () => {
		const beforeClickIcon = 'chevron_left';
		const afterClickIcon = 'chevron_right';

		host = createHost('<wa-sidebar></wa-sidebar>');

		const beforeClick: Element = host.query('mat-icon');
		host.click('.sidebar-toggle');
		const afterClick: Element = host.query('mat-icon');

		expect(beforeClick).toHaveText(beforeClickIcon);
		expect(afterClick).toHaveText(afterClickIcon);
	});

	it('should display ng-content named outlet in mat-sidenav-content as expected ', () => {
		host = createHost(`
      <wa-sidebar>
        <div outlet></div>
      </wa-sidebar>
    `);

		const outlet: Element = host.query('[outlet]');

		expect(outlet).toExist();
	});
});
