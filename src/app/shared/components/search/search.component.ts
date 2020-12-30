import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { ComponentService } from '@wa/app/core/services/component/component.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { IComponent } from '@wa/app/models/component.model';
import { SearchResult } from '@wa/app/models/here-api.model';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';

@Component({
	selector: 'wa-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	providers: [ComponentService],
})
export class SearchComponent implements IComponent, OnInit {
	cities: Promise<SearchResult[]>;
	searchInput: FormControl = new FormControl();
	locating: boolean = false;

	constructor(
		private readonly geoService: GeoService,
		private readonly componentService: ComponentService,
		private readonly locationService: LocationService,
	) {
		this.componentService.init('shared.search');
	}

	ngOnInit(): void {
		this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe((term) => {
			if (term !== '') {
				this.cities = this.geoService.findCities(term);
			}
		});
	}

	onSearchInputFocus(event: any) {
		if (this.locating) {
			event.target.blur();
		}
	}

	async onCurrentLocationClick(): Promise<void> {
		this.locating = true;

		const coords: GeolocationCoordinates = await this.locationService.getLocation();
		const location: SearchResult = await this.geoService.findLocationByCoords(coords);
		this.searchInput.setValue(location.title);

		this.locating = false;
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
