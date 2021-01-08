import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MissingDataComponent } from '@wa/app/shared/components/missing-data/missing-data.component';

describe('MissingDataComponent', () => {
	let host: SpectatorHost<MissingDataComponent>;

	const createHost = createHostFactory(MissingDataComponent);

	it('should create', () => {
		host = createHost('<wa-missing-data></wa-missing-data>');

		const missingData = host.queryHost('wa-missing-data');

		expect(host).toExist();
		expect(missingData).toExist();
	});

	it('should display title and message as expected', () => {
		const expectedTitle = 'Title';
		const expectedMessage = 'Message';

		host = createHost('<wa-missing-data [title]="expectedTitle" [message]="expectedMessage"></wa-missing-data>', {
			hostProps: { expectedTitle, expectedMessage },
		});

		const title = host.query(byText(expectedTitle));
		const message = host.query(byText(expectedMessage));

		expect(title).toBeDefined();
		expect(message).toBeDefined();
	});
});
