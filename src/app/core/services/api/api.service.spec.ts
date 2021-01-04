import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';

describe('ApiService', () => {
	let spectator: SpectatorService<ApiService>;
	let loggerServiceMock: MockProxy<LoggerService>;
	const createService = createServiceFactory({
		service: ApiService,
		mocks: [LoggerService],
	});

	beforeEach(() => {
		loggerServiceMock = mock<LoggerService>();

		mockReset(loggerServiceMock);

		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
