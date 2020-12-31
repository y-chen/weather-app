/* eslint-disable @typescript-eslint/naming-convention */

export interface GeolocationPosition {
	readonly coords: GeolocationCoordinates;
	readonly timestamp: number;
}

export interface GeolocationCoordinates {
	readonly accuracy: number;
	readonly altitude: number | null;
	readonly altitudeAccuracy: number | null;
	readonly heading: number | null;
	readonly latitude: number;
	readonly longitude: number;
	readonly speed: number | null;
}

export interface GeolocationPositionError {
	readonly code: number;
	readonly message: string;
	readonly PERMISSION_DENIED: number;
	readonly POSITION_UNAVAILABLE: number;
	readonly TIMEOUT: number;
}
