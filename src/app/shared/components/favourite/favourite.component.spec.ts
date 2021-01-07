/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { FavouriteComponent } from '@wa/app/shared/components/favourite/favourite.component';

describe('FavouriteComponent', () => {
	let host: SpectatorHost<FavouriteComponent>;
	let componentServiceMock: MockProxy<ComponentService>;
	let localStorageServiceMock: MockProxy<LocalStorageService>;

	const createHost = createHostFactory(FavouriteComponent);

	let favoutiteCities: number[];

	beforeEach(() => {
		componentServiceMock = mock<ComponentService>();
		localStorageServiceMock = mock<LocalStorageService>();

		favoutiteCities = [0, 1];
	});

	afterEach(() => {
		mockReset(componentServiceMock);
		mockReset(localStorageServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-favourite></wa-favourite>');

		const favourite = host.queryHost('wa-favourite');

		expect(host).toExist();
		expect(favourite).toExist();
	});

	it('should init ComponentService', () => {
		host = createHost('<wa-favourite></wa-favourite>', {
			providers: [{ provide: ComponentService, useValue: componentServiceMock }],
		});

		expect(componentServiceMock.init).toHaveBeenCalled();
	});

	it('should call LocalStorageService.set with expected arguments when cityId is not in the favourites', () => {
		const notFavouriteCityId = 2;
		const expectedFavourites: string = JSON.stringify([...favoutiteCities, notFavouriteCityId]);

		localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: notFavouriteCityId },
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});

		host.click('mat-icon');

		expect(localStorageServiceMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, expectedFavourites);
	});

	it('should call LocalStorageService.set with expected arguments when cityId is in the favourites ', () => {
		const favouriteCityId = 0;
		const expectedFavourites = '[1]';

		localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: favouriteCityId },
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});

		host.click('mat-icon');

		expect(localStorageServiceMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, expectedFavourites);
	});
});
