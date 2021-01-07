export interface Config {
	here: Here;
	openWeatherMap: OpenWeatherMap;
}

export interface Here {
	apiKey: string;
	urls: HereUrls;
}

export interface HereUrls {
	geocode: string;
	revGeocode: string;
}

export interface OpenWeatherMap {
	apiKey: string;
	url: string;
}
