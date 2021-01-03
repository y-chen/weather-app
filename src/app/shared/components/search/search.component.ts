/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { debounceTime } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import { LocationService } from '@wa/app/core/services/location/location.service';
import { IComponent } from '@wa/app/models/component.model';
import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';
import { SearchResult } from '@wa/app/models/here-api.model';

@Component({
	selector: 'wa-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	providers: [ComponentService],
})
export class SearchComponent implements IComponent, OnInit {
	cities: Promise<SearchResult[]>;
	searchInput: FormControl = new FormControl();
	locating = false;

	constructor(
		private readonly geoService: GeoService,
		private readonly componentService: ComponentService,
		private readonly locationService: LocationService,
		private readonly router: Router,
	) {
		this.componentService.init({ localizationBasePath: 'shared.search' });
	}

	ngOnInit(): void {
		this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe((term) => {
			if (term !== '') {
				this.cities = this.geoService.findCities(term);
			}
		});
	}

	async onSearchInputKeydown(event: any): Promise<void> {
		if (event.key === 'Enter') {
			const location: SearchResult = await this.geoService.findLocationByQuery(this.searchInput.value);
			const { lat, lng } = location.position;

			event.target.blur();

			await this.navigateToForecast(location, lat, lng);
		}
	}

	onSearchInputFocus(event: any): void {
		if (this.locating) {
			event.target.blur();
		}
	}

	async onCurrentLocationClick(): Promise<void> {
		this.locating = true;

		const coord: GeolocationCoordinates = await this.locationService.getLocation();
		const { latitude, longitude } = coord;
		const location: SearchResult = await this.geoService.findLocationByCoords({
			lat: latitude,
			lon: longitude,
		});

		this.locating = false;

		await this.navigateToForecast(location, latitude, longitude);
	}

	async onAutocompleteOptionClick(selection: SearchResult): Promise<void> {
		const geocoded = await this.geoService.findLocationByQuery(selection.address.label);
		const { lat, lng } = geocoded.position;
		const queryParams = { lat, lon: lng };

		await this.router.navigate(['/app', 'forecast'], { queryParams });
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private async navigateToForecast(location: SearchResult, lat: number, lng: number): Promise<void> {
		const { city, county, countryName } = location.address;
		this.searchInput.setValue(`${city}, ${county}, ${countryName}`);

		const queryParams = { lat, lon: lng };
		await this.router.navigate(['/app', 'forecast'], { queryParams });
	}
}
