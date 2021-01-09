import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { FullScreenSpinnerComponent } from './full-screen-spinner.component';

describe('FullScreenSpinnerComponent', () => {
	let host: SpectatorHost<FullScreenSpinnerComponent>;

	const createHost = createHostFactory(FullScreenSpinnerComponent);

	it('should create', () => {
		host = createHost('<wa-full-screen-spinner></wa-full-screen-spinner>');

		const spinner = host.queryHost('wa-full-screen-spinner');

		expect(host).toExist();
		expect(spinner).toExist();
	});

	it('should not show message when no input', () => {
		host = createHost('<wa-full-screen-spinner></wa-full-screen-spinner>');

		const messageElement = host.query('h1');

		expect(messageElement).toBeFalsy();
	});

	it('should show message when input is valorised', () => {
		const message = 'Spinner Message';
		host = createHost('<wa-full-screen-spinner [message]="message"></wa-full-screen-spinner>', {
			hostProps: {
				message,
			},
		});

		const messageElement = host.query('h1');

		expect(messageElement).toContainText(message);
	});
});
