import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';
import { environment } from '@wa/environments/environment';

describe('ToolbarComponent', () => {
	let host: SpectatorHost<ToolbarComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(ToolbarComponent);

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		settingsServiceMock = mock<SettingsService>();

		settingsServiceMock.getCulture.mockReturnValue(environment.cultures[0]);
	});

	afterEach(() => {
		mockReset(componentServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-toolbar></wa-toolbar>', {
			providers: [
				{ provide: ComponentService, useValue: componentServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const toolbar = host.queryHost('wa-toolbar');

		expect(host).toExist();
		expect(toolbar).toExist();
	});
});
