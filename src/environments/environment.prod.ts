export const environment = {
	production: true,
	weatherAPI: {
		apiKey: '33028dc9bamshc7a6a58130988b9p1e08c0jsnf8cb9fa80510',
		url: 'https://community-open-weather-map.p.rapidapi.com/weather',
	},
	openWeatherMapAPI: {
		apiKey: '1163bbcaa4b45487719cbc8319620fa5',
		url: 'https://api.openweathermap.org/data/2.5',
	},
	hereAPI: {
		apiKey: '1vFZKYF-Lkd-1Cgxe1OtCRnTyCHrqLlG68zrzRNyeiM',
		auth: {
			userId: 'HERE-cc58963f-3bcc-46bd-a806-9a43a4497a23',
			clientId: 'Fy2P8YQXnkWuw0R4Z93R',
			accessKeyId: 'r97ANmQItB8vvPcWz9b3hg',
			accessKeySecret: 'PD6VVvoi-A1rpfcMESJ0i4qkgD4zZLf4JIRblHh0sxuZaIfF9IE75nVO1AKQkclfMcRFOuYtlCk5klQmVMZ6-Q',
			tokenEndpointUrl: 'https://account.api.here.com/oauth2/token',
		},
		urls: {
			geocode: 'https://geocode.search.hereapi.com/v1',
			revGeocode: 'https://revgeocode.search.hereapi.com/v1',
		},
	},
	timeZoneAPI: {
		apiKey: 'UV42KZW70JVB',
		url: 'https://api.timezonedb.com/v2.1',
	},
	askGeoAPI: {
		accountId: 2632,
		apiKey: 'e1f7f23eef9173a65e3921e1fa1bdf5f6dcc9579fafecd287e2e7d96ebc77b5b',
		url: 'https://api.askgeo.com/v1',
	},
};
