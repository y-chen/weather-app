import { Component, Input } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { IComponent } from '@wa/app/models/component.model';

@Component({
	selector: 'wa-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss'],
	providers: [ComponentService],
})
export class FavouriteComponent implements IComponent {
	@Input() cityId: number;

	constructor(private readonly localStorageService: LocalStorageService, private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: 'shared.favourite' });
	}

	isFavourite(): boolean {
		const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.FavouriteCities);
		const favouriteCities: number[] = JSON.parse(favouriteCitieStorageValue) as number[];

		return favouriteCities?.includes(this.cityId);
	}

	onFavouriteClick(): void {
		const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.FavouriteCities);
		const favouriteCities: number[] = JSON.parse(favouriteCitieStorageValue) as number[];
		const cityIndex: number = favouriteCities.indexOf(this.cityId);

		if (cityIndex > -1) {
			favouriteCities.splice(cityIndex, 1);
		} else {
			favouriteCities.push(this.cityId);
		}

		this.localStorageService.set(StorageKeys.FavouriteCities, JSON.stringify(favouriteCities));
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
