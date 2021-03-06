/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { NavItem } from '@wa/app/models/navigation.model';

import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
	let host: SpectatorHost<NavItemComponent>;

	let componentMock: MockProxy<ComponentService>;

	let componentProvider: Provider;
	let configProvider: Provider;

	const createHost = createHostFactory(NavItemComponent);

	let item: NavItem;

	beforeEach(() => {
		const { componentServiceMock, componentServiceProvider, configServiceProvider } = new MockMaster().mockConfig();

		componentMock = componentServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;

		item = { icon: 'Icon', label: 'Label', route: 'Route' };
	});

	afterEach(() => {
		mockReset(componentMock);
	});

	it('should create', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [componentProvider, configProvider],
		});

		const navItem = host.queryHost('wa-nav-item');

		expect(host).toExist();
		expect(navItem).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should have a link to the NavItem.route', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [configProvider],
		});

		const link: HTMLAnchorElement = host.query('a');

		expect(link.href).toEndWith(item.route);
	});

	it('should have correct icon and label', () => {
		host = createHost('<wa-nav-item [item]="item"></wa-nav-item>', {
			hostProps: { item },
			providers: [configProvider],
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
			providers: [configProvider],
		});

		const label: HTMLSpanElement = host.query(byText(item.label));

		expect(label).toBeNull();
	});
});
