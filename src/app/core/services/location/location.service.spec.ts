import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';
import { LocationService } from '@wa/app/core/services/location/location.service';

describe('LocationService', () => {
	let spectator: SpectatorService<LocationService>;
	let notificationServiceMock: MockProxy<NotificationService>;
	let localStorageServiceMock: MockProxy<LocalStorageService>;

	const createService = createServiceFactory({
		service: LocationService,
		mocks: [NotificationService, LocalStorageService],
	});

	beforeEach(() => {
		notificationServiceMock = mock<NotificationService>();
		localStorageServiceMock = mock<LocalStorageService>();

		mockReset(notificationServiceMock);
		mockReset(localStorageServiceMock);

		spectator = createService();
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
