export interface SearchResult {
	title: string;
	id: string;
	resultType: string;
	localityType: string;
	address: Address;
}

export interface Address {
	label: string;
	countryCode: string;
	countryName: string;
	state: string;
	countyCode: string;
	county: string;
	city: string;
	postalCode: number;
}

export interface OAuthToken {
	access_token: string;
	token_type: string;
	expires_in: number;
}
