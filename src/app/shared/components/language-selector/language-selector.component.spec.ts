import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';

import { availableCultures, CultureService } from '@wa/app/core/services/culture/culture.service';
import { LanguageSelectorComponent } from '@wa/app/shared/components/language-selector/language-selector.component';

describe('LanguageSelectorComponent', () => {
	let host: SpectatorHost<LanguageSelectorComponent>;
	let cultureServiceMock: MockProxy<CultureService>;

	const createHost = createHostFactory({
		component: LanguageSelectorComponent,
		mocks: [CultureService],
	});

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();

		mockReset(cultureServiceMock);
	});

	it('should create', () => {
		cultureServiceMock.getCulture.mockReturnValue(availableCultures[0]);

		host = createHost('<wa-language-selector></wa-language-selector>', {
			providers: [{ provide: CultureService, useValue: cultureServiceMock }],
		});

		const languageSelector = host.queryHost('wa-language-selector');

		expect(host).toExist();
		expect(languageSelector).toExist();
	});
});
