export interface Config {
	here: HereConfig;
	openWeatherMap: OpenWeatherMapConfig;
	elasticEmail: ElasticEmailConfig;
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

export interface ElasticEmailConfig {
	apiKey: string;
	url: string;
	from: string;
	fromName: string;
	to: string;
}
