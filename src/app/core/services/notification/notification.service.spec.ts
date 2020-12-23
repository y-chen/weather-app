import { MatSnackBar } from '@angular/material/snack-bar';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { NotificationService } from '@wa/app/core/services/notification/notification.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<NotificationService>;
	let snackBarMock: MockProxy<MatSnackBar>;

	const createService = createServiceFactory({
		service: NotificationService,
		mocks: [MatSnackBar],
	});

	beforeEach(() => {
		snackBarMock = mock<MatSnackBar>();

		mockReset(snackBarMock);

		spectator = createService();
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
