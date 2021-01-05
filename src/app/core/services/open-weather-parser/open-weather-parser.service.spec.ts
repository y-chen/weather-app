import { anyNumber, mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { OpenWeatherParserService } from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import {
	getMocksData, OpenWeatherParserServiceMocks
} from '@wa/app/core/services/open-weather-parser/open-weather-parser.service.spec.mocks';

describe('OpenWeatherParserService', () => {
	let spectator: SpectatorService<OpenWeatherParserService>;
	let cultureServiceMock: MockProxy<CultureService>;

	const createService = createServiceFactory({
		service: OpenWeatherParserService,
		mocks: [CultureService],
	});

	let mocks: OpenWeatherParserServiceMocks;

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();

		mockReset(cultureServiceMock);

		spectator = createService({
			providers: [{ provide: CultureService, useValue: cultureServiceMock }],
		});

		mocks = { ...getMocksData() };
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	describe('parseWeatherData', () => {
		it('should use ViewParserOptions instead on Weather when options are available', () => {
			const { options, weather } = mocks;
			const { iconSize, titleOverride, timezone } = options;

			const parsed = spectator.service.parseWeatherData(weather, options);

			expect(parsed.title).toEqual(titleOverride);
			expect(parsed.icon.endsWith(`${iconSize}x.png`)).toBeTrue();
			expect(cultureServiceMock.convertUnixTimeToLocaleDate).toHaveBeenCalledWith(anyNumber(), timezone);
		});
	});
});
