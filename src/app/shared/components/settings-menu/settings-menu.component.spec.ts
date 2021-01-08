/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable security/detect-object-injection */
/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { cultures, MasterMock } from '@wa/app/common/master-mock';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Culture } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';
import { SettingsMenuComponent } from '@wa/app/shared/components/settings-menu/settings-menu.component';

describe('SettingsMenuComponent', () => {
	let host: SpectatorHost<SettingsMenuComponent>;

	let componentMock: MockProxy<ComponentService>;
	let cultureMock: MockProxy<CultureService>;
	let eventMock: MockProxy<EventService>;
	let settingsMock: MockProxy<SettingsService>;

	let componentProvider: Provider;
	let cultureProvider: Provider;
	let eventProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(SettingsMenuComponent);

	beforeEach(() => {
		const {
			componentServiceMock,
			cultureServiceMock,
			eventServiceMock,
			settingsServiceMock,

			componentServiceProvider,
			cultureServiceProvider,
			eventServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().fixOnSettingsChange().mockCultures().mockCultureWithItalian().mockSettings().mockUnitWithImperial();

		componentMock = componentServiceMock;
		cultureMock = cultureServiceMock;
		eventMock = eventServiceMock;
		settingsMock = settingsServiceMock;

		componentProvider = componentServiceProvider;
		cultureProvider = cultureServiceProvider;
		eventProvider = eventServiceProvider;
		settingsProvider = settingsServiceProvider;
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(cultureMock);
		mockReset(eventMock);
		mockReset(settingsMock);
	});

	it('should create', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, settingsProvider],
		});

		const settingsMenu = host.queryHost('wa-settings-menu');

		expect(host).toExist();
		expect(settingsMenu).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, settingsProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should have cultures, currentLang and currentUnit with expected results returned by CultureService.getAvailableCultures, SettingsService.getCulture and SettingsService.getUnit', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, settingsProvider],
		});

		expect(host.component.cultures).toStrictEqual(cultures);
		expect(host.component.currentLang).toStrictEqual(cultures[0].language);
		expect(host.component.currentUnit).toStrictEqual(Units.Imperial);
	});

	it('should have expected flags in according to available cultures', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, settingsProvider],
		});

		host.click('.menu-trigger');
		const flags: Element[] = host.queryAll('.flag-icon');

		expect(flags).toHaveLength(cultures.length);
		flags.forEach((flag: Element, index: number) => expect(flag.className).toEndWith(cultures[index].language));
	});

	it('should call SettingsService.setCulture with expected culture when click on different from current one', () => {
		const cultureToClick: Culture = cultures[1];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, eventProvider, settingsProvider],
		});

		host.click('.menu-trigger');
		host.click(`.flag-icon-${cultureToClick.language}`);

		expect(cultureMock.setCulture).toHaveBeenCalledWith(cultureToClick);
	});

	it('should not call SettingsService.setCulture when click on same of current one', () => {
		const cultureToClick: Culture = cultures[1];

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, settingsProvider],
		});

		host.click('.menu-trigger');
		host.click(`.flag-icon-${cultureToClick.language}`);

		expect(cultureMock.setCulture).not.toHaveBeenCalledWith();
	});

	it('should call SettingsService.setUnit with expected uni when click on different from current one', () => {
		const unitToClick: Units = Units.Metric;

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, eventProvider, settingsProvider],
		});

		host.click('.menu-trigger');
		host.click(`.unit-button-${unitToClick}`);

		expect(settingsMock.setUnit).toHaveBeenCalledWith(Units[unitToClick]);
	});

	it('should not call SettingsService.setUnit when click on culture same of current one', () => {
		const unitToClick: Units = Units.Imperial;

		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [cultureProvider, componentProvider, settingsProvider],
		});

		host.click('.menu-trigger');
		host.click(`.unit-button-${unitToClick}`);

		expect(settingsMock.setUnit).not.toHaveBeenCalledWith();
	});
});
