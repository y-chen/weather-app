/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';

describe('ShellComponent', () => {
	let host: SpectatorHost<ShellComponent>;

	let componentMock: MockProxy<ComponentService>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(ShellComponent);

	beforeEach(() => {
		const {
			componentServiceMock,

			componentServiceProvider,
			configServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockConfig().mockCulture().mockCultures();

		componentMock = componentServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
		settingsProvider = settingsServiceProvider;
	});

	afterEach(() => {
		mockReset(componentMock);
	});

	it('should create', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [configProvider, settingsProvider],
		});

		const shell = host.queryHost('wa-shell');

		expect(host).toExist();
		expect(shell).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [componentProvider, configProvider, settingsProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getRouteData with expected argument', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [componentProvider, configProvider, settingsProvider],
		});

		expect(componentMock.getRouteData).toHaveBeenCalledWith('navItems');
	});

	it('should pass a router-outler with name outlet as content to wa-sidebar', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [componentProvider, configProvider, settingsProvider],
		});

		const outlet = host.query('router-outlet[outlet]');

		expect(outlet).toExist();
	});
});
