/* eslint-disable @typescript-eslint/naming-convention */

export interface SearchResult {
	title: string;
	id: string;
	resultType: string;
	localityType: string;
	address: Address;
	mapView?: MapView;
	position?: Coord;
}

export interface Coord {
	lat: number;
	lng: number;
}

export interface Address {
	label: string;
	countryCode: string;
	countryName: string;
	state: string;
	countyCode?: string;
	county: string;
	city: string;
	postalCode: number;
}

export interface MapView {
	north: number;
	south: number;
	east: number;
	west: number;
}

export interface OAuthToken {
	access_token: string;
	token_type: string;
	expires_in: number;
}
