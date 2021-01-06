/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { ForecastComponent } from '@wa/app/features/main/components/forecast/forecast.component';

describe('ForecastComponent', () => {
	let host: SpectatorHost<ForecastComponent>;
	let componentServiceMock: MockProxy<ComponentService>;

	const createHost = createHostFactory(ForecastComponent);

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
	});

	afterEach(() => {
		mockReset(componentServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-forecast></wa-forecast>');

		const forecast = host.queryHost('wa-forecast');

		expect(host).toExist();
		expect(forecast).toExist();
	});

	it('should call ComponentService.init', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should call ComponentService.getResolverData with expected param name', () => {
		host = createHost('<wa-forecast></wa-forecast>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.getResolverData).toHaveBeenCalledWith('forecast');
	});
});
