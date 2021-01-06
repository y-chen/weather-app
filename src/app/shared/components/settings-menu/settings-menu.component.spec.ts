/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { SettingsMenuComponent } from '@wa/app/shared/components/settings-menu/settings-menu.component';
import {
	getSettingsMenuComponentMocks, SettingsMenuComponentMocks
} from '@wa/app/shared/components/settings-menu/settings-menu.component.spec.mocks';

describe('SettingsMenuComponent', () => {
	let host: SpectatorHost<SettingsMenuComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(SettingsMenuComponent);

	let mocks: SettingsMenuComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		mocks = getSettingsMenuComponentMocks();

		const { cultures, currentCulture, currentUnit } = mocks;

		cultureServiceMock.getAvailableCultures.mockReturnValue(cultures);
		settingsServiceMock.getCulture.mockReturnValue(currentCulture);
		settingsServiceMock.getUnit.mockReturnValue(currentUnit);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const settingsMenu = host.queryHost('wa-settings-menu');

		expect(host).toExist();
		expect(settingsMenu).toExist();
	});

	it('should call ComponentService.init', () => {
		cultureServiceMock.getAvailableCultures.mockReturnValue(mocks.cultures);

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should cultures, currentLang and currentUnit with expected results returned by CultureService.getAvailableCultures, SettingsService.getCulture and SettingsService.getUnit', () => {
		const { cultures, currentCulture, currentUnit } = mocks;

		settingsServiceMock.getCulture.mockReturnValue(currentCulture);
		settingsServiceMock.getUnit.mockReturnValue(currentUnit);

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		expect(host.component.cultures).toBe(cultures);
		expect(host.component.currentLang).toBe(currentCulture.language);
		expect(host.component.currentUnit).toBe(currentUnit);
	});
});
