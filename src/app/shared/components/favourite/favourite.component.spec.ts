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

	it('should have default primary CSS class when color input is not provided', () => {
		host = createHost('<wa-favourite></wa-favourite>');

		const primary: Element = host.query('.primary');
		const accent: Element = host.query('.accent');

		expect(primary).toBeDefined();
		expect(accent).toBeNull();
	});

	it('should have correct CSS class when color input is provided', () => {
		host = createHost('<wa-favourite color="accent"></wa-favourite>');

		const accent: Element = host.query('.accent');
		const primary: Element = host.query('.primary');

		expect(accent).toBeDefined();
		expect(primary).toBeNull();
	});

	it('should have the default CSS class when cityId is in the favourites and color is not passed as input', () => {
		localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId"></wa-favourite>', {
			hostProps: { cityId: 0 },
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});

		const matIcon: Element = host.query('.primary');

		expect(matIcon).toExist();
	});

	it('should have the provided CSS class when cityId is in the favourites and color is passed as input', () => {
		localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify(favoutiteCities));

		host = createHost('<wa-favourite [cityId]="cityId" [color]="color"></wa-favourite>', {
			hostProps: { cityId: 0, color: 'accent' },
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});

		const matIcon: Element = host.query('.accent');

		expect(matIcon).toExist();
	});

	it('should have the .deselected CSS class when cityId is not in the favourites even when a color is passed as input', () => {
		localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(JSON.stringify([]));

		host = createHost('<wa-favourite [cityId]="cityId" [color]="color"></wa-favourite>', {
			hostProps: { cityId: 0, color: 'accent' },
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});

		const deselected: Element = host.query('.deselected');
		const accent: Element = host.query('.accent');

		expect(deselected).toExist();
		expect(accent).not.toExist();
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
