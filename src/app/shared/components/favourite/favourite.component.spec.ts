/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { StorageKeys } from '@wa/app/common/constants';
import { MockMaster } from '@wa/app/common/mock-master';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';

import { FavouriteComponent } from './favourite.component';

describe('FavouriteComponent', () => {
	let host: SpectatorHost<FavouriteComponent>;

	let componentMock: MockProxy<ComponentService>;
	let localStorageMock: MockProxy<LocalStorageService>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let localStorageProvider: Provider;

	const createHost = createHostFactory(FavouriteComponent);

	let favoutiteCities: number[];

	beforeEach(() => {
		const {
			componentServiceMock,
			localStorageServiceMock,
			componentServiceProvider,
			configServiceProvider,
			localStorageServiceProvider,
		} = new MockMaster().mockConfig();

		componentMock = componentServiceMock;
		localStorageMock = localStorageServiceMock;

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
		localStorageProvider = localStorageServiceProvider;

		favoutiteCities = [0, 1];
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(localStorageMock);
	});

	it('should create', () => {
		host = createHost('<wa-favourite></wa-favourite>', {
			providers: [configProvider],
		});

		const favourite = host.queryHost('wa-favourite');

		expect(host).toExist();
		expect(favourite).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-favourite></wa-favourite>', {
			providers: [componentProvider, configProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should call LocalStorageService.set with expected arguments when cityId is not in the favourites', () => {
		const notFavouriteCityId = 2;
		const expectedFavourites: string = JSON.stringify([...favoutiteCities, notFavouriteCityId]);

		localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: notFavouriteCityId },
			providers: [configProvider, localStorageProvider],
		});

		host.click('mat-icon');

		expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.FavouriteCities, expectedFavourites);
	});

	it('should call LocalStorageService.set with expected arguments when cityId is in the favourites ', () => {
		const favouriteCityId = 0;
		const expectedFavourites = '[1]';

		localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: favouriteCityId },
			providers: [configProvider, localStorageProvider],
		});

		host.click('mat-icon');

		expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.FavouriteCities, expectedFavourites);
	});
});
