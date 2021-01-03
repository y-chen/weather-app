import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '@wa/app/core/services/event/event.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';

@Component({
	selector: 'wa-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteComponent {
	@Input() cityId: number;
	@Input() color: 'primary' | 'accent';

	constructor(private readonly localStorageService: LocalStorageService) {}

	isFavourite(): boolean {
		const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.favouriteCities);
		const favouriteCities: number[] = JSON.parse(favouriteCitieStorageValue) as number[];

		return favouriteCities?.includes(this.cityId);
	}

	onFavouriteChanged(): void {
		const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.favouriteCities);
		const favouriteCities: number[] = JSON.parse(favouriteCitieStorageValue) as number[];
		const cityIndex: number = favouriteCities.indexOf(this.cityId);

		if (cityIndex > -1) {
			favouriteCities.splice(cityIndex, 1);
		} else {
			favouriteCities.push(this.cityId);
		}

		this.localStorageService.set(StorageKeys.favouriteCities, JSON.stringify(favouriteCities));
	}
}
