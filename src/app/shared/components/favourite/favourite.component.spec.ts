/* eslint-disable sonarjs/no-duplicate-string */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';

describe('FavouriteComponent', () => {
	let host: SpectatorHost<FavouriteComponent>;

	let componentMock: MockProxy<ComponentService>;
	let localStorageMock: MockProxy<LocalStorageService>;

	let componentProvider: Provider;
	let localStorageProvider: Provider;

	const createHost = createHostFactory(FavouriteComponent);

	let favoutiteCities: number[];

	beforeEach(() => {
		const { componentServiceMock, localStorageServiceMock, componentServiceProvider, localStorageServiceProvider } = new MasterMock();

		componentMock = componentServiceMock;
		localStorageMock = localStorageServiceMock;

		componentProvider = componentServiceProvider;
		localStorageProvider = localStorageServiceProvider;

		favoutiteCities = [0, 1];
	});

	afterEach(() => {
		mockReset(componentMock);
		mockReset(localStorageMock);
	});

	it('should create', () => {
		host = createHost('<wa-favourite></wa-favourite>');

		const favourite = host.queryHost('wa-favourite');

		expect(host).toExist();
		expect(favourite).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-favourite></wa-favourite>', {
			providers: [componentProvider],
		});

		expect(componentMock.init).toHaveBeenCalled();
	});

	it('should call LocalStorageService.set with expected arguments when cityId is not in the favourites', () => {
		const notFavouriteCityId = 2;
		const expectedFavourites: string = JSON.stringify([...favoutiteCities, notFavouriteCityId]);

		localStorageMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: notFavouriteCityId },
			providers: [localStorageProvider],
		});

		host.click('mat-icon');

		expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, expectedFavourites);
	});

	it('should call LocalStorageService.set with expected arguments when cityId is in the favourites ', () => {
		const favouriteCityId = 0;
		const expectedFavourites = '[1]';

		localStorageMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: favouriteCityId },
			providers: [localStorageProvider],
		});

		host.click('mat-icon');

		expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, expectedFavourites);
	});
});
