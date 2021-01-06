/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable security/detect-object-injection */
/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { ErrorService } from '@wa/app/core/services/error/error.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Culture } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';
import { SettingsMenuComponent } from '@wa/app/shared/components/settings-menu/settings-menu.component';
import {
	getSettingsMenuComponentMocks, SettingsMenuComponentMocks
} from '@wa/app/shared/components/settings-menu/settings-menu.component.spec.mocks';

describe('SettingsMenuComponent', () => {
	let host: SpectatorHost<SettingsMenuComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let cultureServiceMock: MockProxy<CultureService>;
	let eventServiceMock: MockProxy<EventService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(SettingsMenuComponent);

	let mocks: SettingsMenuComponentMocks;

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		cultureServiceMock = mock<CultureService>();
		eventServiceMock = mock<EventService>();
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
		mockReset(eventServiceMock);
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

	it('should have cultures, currentLang and currentUnit with expected results returned by CultureService.getAvailableCultures, SettingsService.getCulture and SettingsService.getUnit', () => {
		const { cultures, currentCulture, currentUnit } = mocks;

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

	it('should have expected flags in according to available cultures', () => {
		const { cultures } = mocks;

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		host.click('.menu-trigger');
		const flags: Element[] = host.queryAll('.flag-icon');

		expect(flags).toHaveLength(cultures.length);
		flags.forEach((flag: Element, index: number) => expect(flag.className).toEndWith(cultures[index].language));
	});

	it('should call SettingsService.setCulture with expected culture when click on different from current one', () => {
		const { cultures } = mocks;
		const cultureToClick: Culture = cultures[0];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: EventService, useValue: eventServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		host.click('.menu-trigger');
		host.click(`.flag-icon-${cultureToClick.language}`);

		expect(cultureServiceMock.setCulture).toHaveBeenCalledWith(cultureToClick);
	});

	it('should not call SettingsService.setCulture when click on same of current one', () => {
		const { cultures } = mocks;
		const cultureToClick: Culture = cultures[1];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		host.click('.menu-trigger');
		host.click(`.flag-icon-${cultureToClick.language}`);

		expect(cultureServiceMock.setCulture).not.toHaveBeenCalledWith();
	});

	it('should call SettingsService.setUnit with expected uni when click on different from current one', () => {
		const { units } = mocks;
		const unitToClick: string = units[0];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: EventService, useValue: eventServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		host.click('.menu-trigger');
		host.click(`.unit-button-${unitToClick}`);

		expect(settingsServiceMock.setUnit).toHaveBeenCalledWith(Units[unitToClick]);
	});

	it('should not call SettingsService.setUnit when click on culture same of current one', () => {
		const { units } = mocks;
		const unitToClick: string = units[1];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		host.click('.menu-trigger');
		host.click(`.unit-button-${unitToClick}`);

		expect(settingsServiceMock.setUnit).not.toHaveBeenCalledWith();
	});
});
