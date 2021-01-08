export interface Config {
	here: Here;
	openWeatherMap: OpenWeatherMap;
	slackHookUrl: string;
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
