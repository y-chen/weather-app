import { Injectable } from '@angular/core';
import { StorageKeys } from '@wa/app/common/constants';
import { GeolocationCoordinates, GeolocationPosition, GeolocationPositionError } from '@wa/app/models/geolocation.model';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class LocationService {
	constructor(private readonly notificationService: NotificationService, private readonly localStorageService: LocalStorageService) {}

	async getLocation(): Promise<GeolocationCoordinates> {
		if (!navigator.geolocation) {
			throw new Error('Geolocation not available');
		}

		return new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					this.storeLocation(position);

					resolve(position.coords);
				},
				(error: GeolocationPositionError) => {
					this.handleGeolocationError(error);

					reject(error);
				},
				{ timeout: 5000 },
			),
		);
	}

	private storeLocation(position: GeolocationPosition): void {
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
