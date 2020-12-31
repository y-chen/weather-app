import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

describe('OverlaySpinnerComponent', () => {
	let host: SpectatorHost<OverlaySpinnerComponent>;
	let routerMock: MockProxy<Router>;

	const createHost = createHostFactory({
		component: OverlaySpinnerComponent,
		mocks: [Router],
	});

	beforeEach(() => {
		routerMock = mock<Router>();

		mockReset(routerMock);

		const routerProps = ['events'];
		routerProps.forEach((prop) => {
			Object.defineProperty(routerMock, prop, {
				get: jest.fn(() => new EventEmitter()),
			});
		});
	});

	it('should create', () => {
		host = createHost('<cvm-overlay-spinner></cvm-overlay-spinner>', {
			providers: [{ provide: Router, useValue: routerMock }],
		});

		const overlay = host.queryHost('cvm-overlay-spinner');

		expect(host).toExist();
		expect(overlay).toExist();
	});
});
