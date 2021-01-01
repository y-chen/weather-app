/* eslint-disable @typescript-eslint/naming-convention */

export interface AskGeo {
	code: number;
	message: string;
	data: [{ TimeZone: TimeZone }];
}

export interface TimeZone {
	IsInside: string;
	AskGeoId: number;
	MinDistanceKm: number;
	TimeZoneId: string;
	ShortName: string;
	CurrentOffsetMs: number;
	WindowsStandardName: string;
	InDstNow: 'true' | 'false';
}
