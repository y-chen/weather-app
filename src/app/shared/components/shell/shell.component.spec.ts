/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';
import { environment } from '@wa/environments/environment';

describe('ShellComponent', () => {
	let host: SpectatorHost<ShellComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory({ component: ShellComponent });

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		cultureServiceMock.getAvailableCultures.mockReturnValue(environment.cultures);
		settingsServiceMock.getCulture.mockReturnValue(environment.cultures[0]);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
		});

		const shell = host.queryHost('wa-shell');

		expect(host).toExist();
		expect(shell).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getRouteData with expected argument', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.getRouteData).toHaveBeenCalledWith('navItems');
	});

	it('should pass a router-outler with name outlet as content to wa-sidebar', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const outlet = host.query('router-outlet[outlet]');

		expect(outlet).toExist();
	});
});
