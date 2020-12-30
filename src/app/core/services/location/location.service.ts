import { Injectable } from '@angular/core';

import { GeolocationPosition, GeolocationPositionError } from '@wa/app/models/geolocation.model';
import {
	LocalStorageService,
	StorageKeys,
} from '@wa/app/core/services/local-storage/local-storage.service';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';

@Injectable()
export class LocationService {
	constructor(
		private readonly notificationService: NotificationService,
		private readonly localStorageService: LocalStorageService,
	) {}

	getPosition() {
		if (!navigator.geolocation) {
			throw new Error('Geolocation not available');
		}

		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => this.storePosition(position),
			(error: GeolocationPositionError) => this.handleGeolocationError(error),
		);
	}

	private storePosition(position: GeolocationPosition): void {
		const { latitude, longitude } = position.coords;
		const stringifyCoords = JSON.stringify({ latitude, longitude });

		this.localStorageService.set(StorageKeys.Position, stringifyCoords);
	}

	private handleGeolocationError(error: GeolocationPositionError): void {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				this.notificationService.showError('Allow geolocation if you want to use this feature');
				break;
			case (error.POSITION_UNAVAILABLE, error.TIMEOUT):
				this.notificationService.showError('An error occured while getting geolocation');
				break;
		}
	}
}
