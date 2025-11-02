import { Component, Input } from '@angular/core';
import { LocalizationPathKeys, StorageKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { IComponent } from '@wa/app/models/component.model';

@Component({
	selector: 'wa-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss'],
	providers: [ComponentService],
})
export class FavouriteComponent implements IComponent {
        @Input() locationKey: string;

	constructor(private readonly localStorageService: LocalStorageService, private readonly componentService: ComponentService) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.FavouriteComponent });
	}

	isFavourite(): boolean {
                const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.FavouriteCities);
                if (!favouriteCitieStorageValue) {
                        return false;
                }

                const favouriteCities: string[] = JSON.parse(favouriteCitieStorageValue) as string[];

                return favouriteCities?.includes(this.locationKey);
        }

        onFavouriteClick(): void {
                const favouriteCitieStorageValue: string = this.localStorageService.get(StorageKeys.FavouriteCities);
                const favouriteCities: string[] = favouriteCitieStorageValue
                        ? (JSON.parse(favouriteCitieStorageValue) as string[])
                        : [];
                const cityIndex: number = favouriteCities.indexOf(this.locationKey);

                if (cityIndex > -1) {
                        favouriteCities.splice(cityIndex, 1);
                } else {
                        favouriteCities.push(this.locationKey);
                }

                this.localStorageService.set(StorageKeys.FavouriteCities, JSON.stringify(favouriteCities));
        }

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
