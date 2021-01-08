/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ForecastComponent } from '@wa/app/features/main/components/forecast/forecast.component';

describe('ForecastComponent', () => {
	let host: SpectatorHost<ForecastComponent>;

	let componentMock: MockProxy<ComponentService>;

	let componentProvider: Provider;
	let configProvider: Provider;

	const createHost = createHostFactory(ForecastComponent);

	beforeEach(() => {
		const { componentServiceMock, componentServiceProvider, configServiceProvider } = new MasterMock().mockConfig();

		componentMock = componentServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
	});

	afterEach(() => {
		mockReset(componentMock);
	});

	it('should create', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [componentProvider, configProvider],
		});

		const forecast = host.queryHost('wa-forecast');

		expect(host).toExist();
		expect(forecast).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getResolverData with expected param name', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.getResolverData).toHaveBeenCalledWith('forecast');
	});
});
