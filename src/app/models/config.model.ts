export interface Config {
	here: HereConfig;
	openWeatherMap: OpenWeatherMapConfig;
	slackHookUrl: string;
}

export interface HereConfig {
	apiKey: string;
	urls: HereUrls;
}

export interface HereUrls {
	geocode: string;
	revGeocode: string;
}

export interface OpenWeatherMapConfig {
	apiKey: string;
	url: string;
}

export interface SlackConfig {
	hookUrl: string;
	channel: string;
}
