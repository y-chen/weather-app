export interface TimeZoneDB {
	status: string;
	message: string;
	countryCode: string;
	countryName: string;
	zoneName: string;
	abbreviation: string;
	gmtOffset: number;
	dst: string;
	zoneStart: number;
	zoneEnd: number;
	nextAbbreviation: string;
	timestamp: number;
	formatted: string;
}
