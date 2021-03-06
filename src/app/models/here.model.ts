/* eslint-disable @typescript-eslint/naming-convention */

import { OpenCoord } from '@wa/app/models/open-weather.model';

export interface HereSearchParams {
	id?: string;
	coord?: OpenCoord;
	query?: string;
}

export interface HereLocation {
	title: string;
	id: string;
	resultType: string;
	localityType?: string;
	address: Address;
	mapView?: MapView;
	position?: HereCoord;
	houseNumberType?: string;
	access?: HereCoord[];
	distance?: number;
}

export interface HereCoord {
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
	postalCode: string;
	district?: string;
	street?: string;
	houseNumber?: string;
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
