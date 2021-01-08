import { Provider } from '@angular/core';
import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { MissingDataComponent } from '@wa/app/shared/components/missing-data/missing-data.component';

describe('MissingDataComponent', () => {
	let host: SpectatorHost<MissingDataComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(MissingDataComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		configProvider = configServiceProvider;
	});

	it('should create', () => {
		host = createHost('<wa-missing-data></wa-missing-data>', {
			providers: [configProvider],
		});

		const missingData = host.queryHost('wa-missing-data');

		expect(host).toExist();
		expect(missingData).toExist();
	});

	it('should display title and message as expected', () => {
		const expectedTitle = 'Title';
		const expectedMessage = 'Message';

		host = createHost('<wa-missing-data [title]="expectedTitle" [message]="expectedMessage"></wa-missing-data>', {
			hostProps: { expectedTitle, expectedMessage },
			providers: [configProvider],
		});

		const title = host.query(byText(expectedTitle));
		const message = host.query(byText(expectedMessage));

		expect(title).toBeDefined();
		expect(message).toBeDefined();
	});
});
