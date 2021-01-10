import { FormControl } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
	let host: SpectatorHost<TextAreaComponent>;

	const createHost = createHostFactory(TextAreaComponent);

	it('should create', () => {
		host = createHost('<wa-text-area></wa-text-area>', {
			props: { control: new FormControl() },
		});

		const textArea = host.queryHost('wa-text-area');

		expect(host).toExist();
		expect(textArea).toExist();
	});
});
