export const environment = {
	production: true,
	cultures: [
		{
			label: 'English',
			language: 'en',
			code: 'en-GB',
		},
		{
			label: 'Italiano',
			language: 'it',
			code: 'it-IT',
		},
	],
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
	openWeatherMapAPI: {
		apiKey: '1163bbcaa4b45487719cbc8319620fa5',
		url: 'https://api.openweathermap.org/data/2.5',
	},
};
