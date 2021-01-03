import { Component, Input, OnInit } from '@angular/core';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';

@Component({
	selector: 'wa-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
	@Input() cityId: number;
	@Input() color: 'primary' | 'accent';

	constructor(private readonly localStorageService: LocalStorageService) {}

	ngOnInit(): void {}

	isFavourite(): boolean {
		const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.favouriteCities);
		const favouriteCities: number[] = JSON.parse(favouriteCitieStorageValue) as number[];

		return favouriteCities?.includes(this.cityId);
	}
}
