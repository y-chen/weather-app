import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { ShellComponent } from '@wa/app/shared/components/shell/shell.component';
import { environment } from '@wa/environments/environment';

describe('ShellComponent', () => {
	let host: SpectatorHost<ShellComponent>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory({
		component: ShellComponent,
	});

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		cultureServiceMock.getAvailableCultures.mockReturnValue(environment.cultures);
		settingsServiceMock.getCulture.mockReturnValue(environment.cultures[0]);
	});

	afterEach(() => {
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-shell></wa-shell>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const shell = host.queryHost('wa-shell');

		expect(host).toExist();
		expect(shell).toExist();
	});
});
