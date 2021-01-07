import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { AngularFirestore } from '@angular/fire/firestore';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ConfigService } from '@wa/app/core/services/config/config.service';

describe('ConfigService', () => {
	let spectator: SpectatorService<ConfigService>;
	let firestoreMock: MockProxy<AngularFirestore>;

	const createService = createServiceFactory(ConfigService);

	beforeEach(() => {
		firestoreMock = mock<AngularFirestore>();

		spectator = createService({
			providers: [{ provide: AngularFirestore, useValue: firestoreMock }],
		});
	});

	afterEach(() => {
		mockReset(firestoreMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
