import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { TranslateService } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';

import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';
import { LanguageSelectorComponent } from '@wa/app/shared/components/language-selector/language-selector.component';

describe('ToolbarComponent', () => {
	let host: SpectatorHost<ToolbarComponent>;
	let translateMock: MockProxy<TranslateService>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory({
		component: ToolbarComponent,
	});

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		translateMock = mock<TranslateService>();

		mockReset(componentServiceMock);
		mockReset(translateMock);
	});

	it('should create', () => {
		host = createHost('<wa-toolbar></wa-toolbar>');

		const toolbar = host.queryHost('wa-toolbar');

		expect(host).toExist();
		expect(toolbar).toExist();
	});
});
